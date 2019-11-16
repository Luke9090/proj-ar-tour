'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

import { latLonToMerc, arPosFromMercs, distanceToModel } from './utils/coords';

export default class HelloWorldSceneAR extends Component {
  state = {
    currPos: [53.485979, -2.239815],
    locations: [{ latLon: [53.486233, -2.241182], name: 'corner' }]
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ currPos: [latitude, longitude] });
      },
      console.log,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render = () => {
    const { changePage } = this.props.sceneNavigator.viroAppProps;
    const { locations, currPos } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {locations.map(({ latLon, name }) => {
          const objMercCoords = arPosFromMercs(latLon);
          const currMercCoords = arPosFromMercs(currPos);
          const arPos = arPosFromMercs(currMercCoords, objMercCoords);
          const distance = distanceToModel(currMercCoords, objMercCoords);
          <ViroText text={`${name} - ${distance}m`} scale={[50, 50, 50]} position={arPos} style={styles.helloWorldTextStyle} />;
        })}
        <ViroText text="Back" scale={[50, 50, 50]} position={[0, -20, -100]} style={styles.helloWorldTextStyle} onClick={() => changePage('splash')} />
      </ViroARScene>
    );
  };

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'AR Nav'
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
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

module.exports = HelloWorldSceneAR;
