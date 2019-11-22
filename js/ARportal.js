'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroSpinner } from 'react-viro';

import PortalScene from './PortalScene';

export default class ARportal extends Component {
  state = {
    portalImg: 'https://i.imgur.com/u7lcwmg.jpg',
    isLoading: true
  };

  componentDidMount = () => {
    // Placeholder for fetching specific location data from backend
    const { currLoc } = this.props.sceneNavigator.viroAppProps;
    const locData = require('./data/location')[currLoc];
    this.setState({ portalImg: locData.portalImg, isLoading: false });
  };

  render() {
    const { isLoading, portalImg } = this.state;
    return <ViroARScene>{isLoading ? <ViroSpinner position={[0, 0, -2]} scale={[1, 1, 1]} /> : <PortalScene portalImg={portalImg} />}</ViroARScene>;
  }
}

module.exports = ARportal;
