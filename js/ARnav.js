'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

import { latLonToMerc, arPosFromMercs, distanceToModel, findHeading, mercsFromPolar } from './utils/coords';

export default class HelloWorldSceneAR extends Component {
  state = {
    startPos: null,
    currPos: null,
    calPos: null,
    travelled: 0,
    locations: [
      { latLon: [53.486249, -2.239237], name: 'danXhan' },
      { latLon: [53.485789, -2.237766], name: 'rigaXhan' },
      { latLon: [53.486233, -2.241182], name: 'corpXball' },
      { latLon: [54.485979, -2.239815], name: 'North' },
      { latLon: [52.485979, -2.239815], name: 'South' },
      { latLon: [53.485979, -1.239815], name: 'East' },
      { latLon: [53.485979, -3.239815], name: 'West' }
    ],
    initialized: 'pending',
    indoors: false
  };

  componentDidMount = () => {
    // navigator.geolocation.getCurrentPosition(
    //   location => {
    //     const { latitude, longitude, altitude, heading } = location.coords;
    //     console.log(location);
    //     console.log('latLon from geoloc: ', latitude, longitude);
    //     this.setState({ startPos: [latitude, longitude] });
    //   },
    //   console.log,
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
    if (this.state.indoors) {
      this.setState({
        currPos: [53.486006, -2.239878],
        startPos: [53.486006, -2.239878],
        calPos: [53.485874, -2.239987] // On line straight out of window towards balloon st.
      });
    } else {
      navigator.geolocation.watchPosition(
        location => {
          const { initialized, startPos, calPos } = this.state;
          const { latitude, longitude } = location.coords;
          const currPos = [latitude, longitude];
          this.setState({ currPos });
          if (initialized === 'success' && startPos)
            this.setState(() => {
              const travelled = distanceToModel(latLonToMerc(currPos), latLonToMerc(startPos));
              if (calPos) return { currPos, travelled };
              if (travelled > 10) return { currPos, travelled, calPos: currPos };
            });
          if (initialized === 'success' && !startPos) this.setState({ startPos: [latitude, longitude] });
        },
        console.log,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 2 }
      );
    }
  };

  render = () => {
    const { changePage } = this.props.sceneNavigator.viroAppProps;
    const { locations, currPos, calPos, startPos } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        {calPos ? (
          locations.map(this.renderLocAsText)
        ) : (
          <ViroText text={startPos ? 'Walk this way' : 'Initializing'} position={[0, 0, -20]} style={styles.helloWorldTextStyle} scale={[3, 3, 3]} />
        )}
      </ViroARScene>
    );
  };

  renderLocAsText = ({ latLon, name }) => {
    console.log('--------------------------------------');
    const { locations, startPos, calPos } = this.state;
    console.log('name: ', name);
    const objMercCoords = latLonToMerc(latLon);
    console.log('objMercCoords: ', objMercCoords);
    const startMercCoords = latLonToMerc(startPos);
    console.log('startMercCoords: ', startMercCoords);
    const arPos = arPosFromMercs(startMercCoords, objMercCoords);
    console.log('arPos: ', arPos);
    const distance = distanceToModel(startMercCoords, objMercCoords);
    console.log('distance: ', distance);
    const calMerc = latLonToMerc(calPos);
    console.log('calMerc: ', calMerc);
    const trueHeadingFromWest = findHeading(startMercCoords, calMerc);
    console.log('trueHeadingFromWest: ', trueHeadingFromWest);
    const objPolarAngle = findHeading(startMercCoords, objMercCoords);
    console.log('objPolarAngle: ', objPolarAngle);
    const newPolarCoords = [objPolarAngle - trueHeadingFromWest, distance];
    console.log('newPolarCoords: ', newPolarCoords);
    const newArPos = mercsFromPolar(newPolarCoords, startPos);
    console.log('newArPos: ', newArPos);
    return (
      <ViroText
        key={name}
        text={`${name} ${distance}m`}
        scale={[distance / 4, distance / 4, distance / 4]}
        position={newArPos}
        style={styles.helloWorldTextStyle}
        transformBehaviors={['billboard']}
      />
    );
  };

  onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log('succesful initialization');
      this.setState({ initialized: 'success' });
    } else if (state == ViroConstants.TRACKING_NONE) {
      console.log('initialization error');
      this.setState({ initialized: 'error' });
    }
  };

  onCalibrated = angleAdj => {
    this.setState({ angleAdj, calibrated: true });
  };
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = HelloWorldSceneAR;
