'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

import { latLonToMerc, arPosFromMercs, distanceToModel } from './utils/coords';

export default class HelloWorldSceneAR extends Component {
  state = {
    currPos: [53.485979, -2.239815],
    locations: [
      { latLon: [53.486249, -2.239237], name: 'danXhan' },
      { latLon: [53.486233, -2.241182], name: 'corpXball' },
      { latLon: [53.485789, -2.237766], name: 'rigaXhan' }
    ],
    initialized: 'pending'
  };

  componentDidMount = () => {
    // navigator.geolocation.getCurrentPosition(
    //   ({ coords: { latitude, longitude } }) => {
    //     console.log('latLon from geoloc: ', latitude, longitude);
    //     this.setState({ currPos: [latitude, longitude] });
    //   },
    //   console.log,
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  };

  render = () => {
    const { changePage } = this.props.sceneNavigator.viroAppProps;
    const { locations, currPos } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {/* {locations.map(this.renderLocAsText)} */}
        {this.renderLocAsText(locations[0])}
        {this.renderLocAsText(locations[1])}
        {this.renderLocAsText(locations[2])}
      </ViroARScene>
    );
  };

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({ initialized: 'success' });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({ initialized: 'error' });
    }
  };

  renderLocAsText = ({ latLon, name }) => {
    const { locations, currPos } = this.state;
    console.log('name: ', name);
    const objMercCoords = latLonToMerc(latLon);
    console.log('objMercCoords: ', objMercCoords);
    const currMercCoords = latLonToMerc(currPos);
    console.log('currMercCoords: ', currMercCoords);
    const arPos = arPosFromMercs(currMercCoords, objMercCoords);
    console.log('arPos: ', arPos);
    const distance = distanceToModel(currMercCoords, objMercCoords);
    console.log('distance: ', distance);
    return <ViroText key={name} text={`${name} ${distance}m`} scale={[50, 50, 50]} position={arPos} style={styles.helloWorldTextStyle} />;
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
