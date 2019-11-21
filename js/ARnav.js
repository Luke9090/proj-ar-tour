'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants, ViroMaterials, Viro3DObject, ViroAmbientLight } from 'react-viro';

import { latLonToMerc, distanceToModel, findHeading, mercsFromPolar } from './utils/coords';

export default class ARnav extends Component {
  state = {
    startPosMerc: null,
    currPosMerc: null,
    accuracy: null,
    trueHeading: null,
    travelled: 0,
    testLocations: [
      { latLon: [53.486249, -2.239237], name: 'danXhan' },
      { latLon: [53.485789, -2.237766], name: 'rigaXhan' },
      { latLon: [53.486233, -2.241182], name: 'corpXball' }
    ],
    initialized: 'pending',
    indoors: true,
    test: true,
    triggerRadius: 30,
    currArPos: [0, 0, 0]
  };

  componentDidMount = () => {
    const { updateCurrCoords } = this.props.sceneNavigator.viroAppProps;
    if (this.state.indoors) {
      this.setState({
        currPosMerc: latLonToMerc([53.477756, -2.244138]), // near fth
        startPosMerc: latLonToMerc([53.477756, -2.244138]),
        // currPosMerc: latLonToMerc([53.477967, -2.247045]), // at fth
        // startPosMerc: latLonToMerc([53.477967, -2.247045]),
        // currPosMerc: latLonToMerc([53.486006, -2.239878]), // nc
        // startPosMerc: latLonToMerc([53.486006, -2.239878]),
        trueHeading: findHeading(latLonToMerc([53.486006, -2.239878]), latLonToMerc([53.485874, -2.239987]))
      });
    } else {
      const watchID = navigator.geolocation.watchPosition(
        location => {
          const { initialized, startPosMerc, trueHeading } = this.state;
          const { latitude, longitude, accuracy } = location.coords;
          const newPos = [latitude, longitude];
          updateCurrCoords(newPos);
          const newPosMerc = latLonToMerc(newPos);
          this.setState({ currPosMerc: newPosMerc, accuracy });
          if (initialized === 'success' && startPosMerc)
            this.setState(() => {
              const travelled = distanceToModel(newPosMerc, startPosMerc);
              if (trueHeading) return { currPosMerc: newPosMerc, travelled };
              if (travelled > 30) return { currPosMerc: newPosMerc, travelled, trueHeading: findHeading(startPosMerc, newPosMerc) };
            });
          if (initialized === 'success' && !startPosMerc && accuracy < 11) this.setState({ startPosMerc: newPosMerc });
        },
        console.log,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 0.5 }
      );
      this.setState({ watchID });
    }
  };

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.state.watchID);
  };

  render = () => {
    const { changePage, locations } = this.props.sceneNavigator.viroAppProps;
    const { startPosMerc, accuracy, trueHeading, test, testLocations } = this.state;
    if (test) locations = testLocations;
    return (
      <ViroARScene
        onTrackingUpdated={this.onInitialized}
        onCameraTransformUpdate={({ cameraTransform }) => {
          this.setState({ currArPos: cameraTransform.position });
        }}
      >
        {trueHeading ? (
          <>
            <ViroAmbientLight color="#FFFFFF" />
            {locations.map(this.renderLocAsText)}
          </>
        ) : (
          <ViroText
            text={startPosMerc ? `Walk ${accuracy}` : `Initializing ${accuracy}`}
            position={[0, 0, -40]}
            style={styles.helloWorldTextStyle}
            scale={[4, 4, 4]}
          />
        )}
      </ViroARScene>
    );
  };

  renderLocAsText = ({ coords, name }, i) => {
    const { changePage, currLoc } = this.props.sceneNavigator.viroAppProps;
    const { currPosMerc, startPosMerc, trueHeading, triggerRadius, currArPos } = this.state;
    const latLon = [coords._lat, coords._long];
    const objMercCoords = latLonToMerc(latLon);
    const distance = distanceToModel(startPosMerc, objMercCoords);
    // const currDistance = distanceToModel(currPosMerc, objMercCoords);
    const objPolarAngle = findHeading(startPosMerc, objMercCoords);
    const newPolarCoords = [objPolarAngle - trueHeading, distance];
    const newArPos = mercsFromPolar(newPolarCoords);
    const currArDistance = distanceToModel(currArPos, newArPos);
    if (currArDistance < triggerRadius && i !== currLoc) changePage('split', 'nav', 'arrival', i);
    if (i === currLoc && currArDistance > triggerRadius) changePage('split', 'nav', 'map', null);

    const arrowScale = 100;
    const textScale = currArDistance / 7;
    const arrowHeight = arrowScale / 2 + (textScale > 10 ? textScale / 2 : 10);
    return (
      <React.Fragment key={name}>
        <Viro3DObject
          source={require('../imgs/arrow/model.obj')}
          resources={[require('../imgs/arrow/materials.mtl')]}
          position={[newArPos[0], arrowHeight, newArPos[2]]}
          rotation={[0, 0, 180]}
          scale={[arrowScale, arrowScale, arrowScale]}
          type="OBJ"
          onError={e => {
            console.log(e.nativeEvent.error);
          }}
        />
        <ViroText
          text={`${name} - ${currArDistance}m`}
          scale={[textScale, textScale, textScale]}
          position={[newArPos[0], 0, newArPos[2]]}
          style={{ fontFamily: 'Arial', fontSize: 20, color: '#FFFFFF' }}
          outerStroke={{ type: 'Outline', width: 2, color: '#000000' }}
          textClipMode="None"
          textLineBreakMode="None"
          textAlign="center"
          transformBehaviors={['billboard']}
          height={1}
        />
      </React.Fragment>
    );
  };

  onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ initialized: 'success' });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({ initialized: 'error' });
    }
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

module.exports = ARnav;
