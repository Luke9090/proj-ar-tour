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
      { coords: { _lat: 53.486249, _long: -2.239237 }, name: 'danXhan' },
      { coords: { _lat: 53.485789, _long: -2.237766 }, name: 'rigaXhan' },
      { coords: { _lat: 53.486233, _long: -2.241182 }, name: 'corpXball' }
    ],
    locCoords: [],
    initialized: 'pending',
    indoors: false,
    test: true,
    triggerRadius: 30,
    currArPos: [0, 0, 0],
    calDist: 60,
    accThreshold: 10,
    useArPos: true,
    readyToRender: false
  };

  componentDidMount = () => {
    this.ArScene = null;
    const { updateCurrCoords, useCompass } = this.props.sceneNavigator.viroAppProps;
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
          const { locations } = this.props.sceneNavigator.viroAppProps;
          const { initialized, startPosMerc, trueHeading, accThreshold, readyToRender, calDist } = this.state;
          const { latitude, longitude, accuracy } = location.coords;
          const newPos = [latitude, longitude];
          updateCurrCoords(newPos);
          const newPosMerc = latLonToMerc(newPos);
          this.setState({ currPosMerc: newPosMerc, accuracy });
          if (initialized === 'success' && startPosMerc) {
            const travelled = distanceToModel(newPosMerc, startPosMerc);
            if (trueHeading !== null) this.setState({ currPosMerc: newPosMerc, travelled });
            else if (travelled > 0.8 * calDist && accuracy < accThreshold)
              this.setState(
                { currPosMerc: newPosMerc, travelled, trueHeading: useCompass ? Math.PI / 2 : findHeading(startPosMerc, newPosMerc) },
                this.calculateArCoords
              );
          }
          if (initialized === 'success' && !startPosMerc && accuracy < accThreshold) this.setState({ startPosMerc: newPosMerc });
          if (this.ArScene && readyToRender)
            this.ArScene.getCameraOrientationAsync().then(orientation => {
              this.setState({ currArPos: orientation.position }, this.recalculateArDistances);
            });
        },
        console.log,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 0.5 }
      );
      this.setState({ watchID });
    }
  };

  calculateArCoords = () => {
    const { locations, currLoc } = this.props.sceneNavigator.viroAppProps;
    const { testLocations, test } = this.state;
    const usedLocations = test ? testLocations : locations;
    this.setState(currState => {
      const locCoords = usedLocations.map(this.calculateArCoord);
      return { readyToRender: true, locCoords };
    });
  };

  calculateArCoord = ({ coords }, i) => {
    const { currPosMerc, startPosMerc, trueHeading, triggerRadius, currArPos, useArPos } = this.state;
    const latLon = [coords._lat, coords._long];
    const objMercCoords = latLonToMerc(latLon);
    const distance = distanceToModel(startPosMerc, objMercCoords);
    const currGpsDistance = distanceToModel(currPosMerc, objMercCoords);
    const objPolarAngle = findHeading(startPosMerc, objMercCoords);
    const newPolarCoords = [objPolarAngle - trueHeading, distance];
    const newArPos = mercsFromPolar(newPolarCoords);

    const currArDistance = distanceToModel(currArPos, newArPos);
    const currDistance = useArPos ? currArDistance : currGpsDistance;

    return { newArPos, currDistance };
  };

  recalculateArDistances = () => {
    const { locations, currLoc } = this.props.sceneNavigator.viroAppProps;
    const { testLocations, test } = this.state;
    const usedLocations = test ? testLocations : locations;
    this.setState(currState => {
      const locCoords = usedLocations.map(this.recalculateArDistance);
      return { locCoords };
    });
  };

  recalculateArDistance = ({ coords }, i) => {
    const { currLoc, changePage } = this.props.sceneNavigator.viroAppProps;
    const newArPos = this.state.locCoords[i].newArPos;

    const { currPosMerc, startPosMerc, trueHeading, triggerRadius, currArPos, useArPos } = this.state;
    const latLon = [coords._lat, coords._long];
    const objMercCoords = latLonToMerc(latLon);
    const currGpsDistance = distanceToModel(currPosMerc, objMercCoords);

    const currArDistance = distanceToModel(currArPos, newArPos);
    const currDistance = useArPos ? currArDistance : currGpsDistance;

    if (currDistance < triggerRadius && i !== currLoc) changePage('split', 'nav', 'arrival', i);
    if (i === currLoc && currDistance > triggerRadius) changePage('split', 'nav', 'map', null);

    return { newArPos, currDistance };
  };

  componentWillUnmount = () => {
    if (!this.state.indoors) navigator.geolocation.clearWatch(this.state.watchID);
  };

  render = () => {
    const { changePage, locations } = this.props.sceneNavigator.viroAppProps;
    const { startPosMerc, accuracy, trueHeading, test, testLocations, calDist, readyToRender, initialized } = this.state;
    console.log('accuracy: ', accuracy);
    return (
      <ViroARScene
        onTrackingUpdated={this.onInitialized}
        ref={element => {
          this.ArScene = element;
        }}
      >
        {readyToRender ? (
          <>
            <ViroAmbientLight color="#FFFFFF" />
            {test ? testLocations.map(this.renderLocAsText) : locations.map(this.renderLocAsText)}
          </>
        ) : (
          <ViroText
            text={
              trueHeading
                ? 'Calibration successful'
                : startPosMerc
                ? `Walk this way to calibrate`
                : initialized === 'success'
                ? 'Finding location - Please wait'
                : initialized === 'error'
                ? 'Initialization error - Please restart app'
                : `Initializing - Please wait`
            }
            position={[0, 0, -calDist]}
            style={{ fontFamily: 'Arial', fontSize: 20, color: '#FFFFFF' }}
            outerStroke={{ type: 'Outline', width: 2, color: '#000000' }}
            textClipMode="None"
            textLineBreakMode="WordWrap"
            textAlign="center"
            scale={[calDist / 10, calDist / 10, calDist / 10]}
          />
        )}
      </ViroARScene>
    );
  };

  renderLocAsText = ({ coords, name }, i) => {
    const { newArPos, currDistance } = this.state.locCoords[i];

    const arrowScale = 100;
    const textScale = currDistance / 7;
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
          text={`${name} - ${currDistance}m`}
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
