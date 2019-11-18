'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  state = {
    text: 'Initializing AR...'
  };

  render = () => {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText text={this.state.text} scale={[50, 50, 50]} position={[0, 0, -100]} style={styles.helloWorldTextStyle} />
        {/* <ViroText text="Back" scale={[50, 50, 50]} position={[0, -20, -100]} style={styles.helloWorldTextStyle} onClick={() => changePage('splash')} /> */}
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
