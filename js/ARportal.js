'use strict';

import React, { Component } from 'react';

import { ViroARScene, ViroSpinner } from 'react-viro';

import PortalScene from './PortalScene';

export default class ARportal extends Component {
  state = {
    portalImg: require('../imgs/360_island.jpg'),
    isLoading: false
  };

  render() {
    const { isLoading, title, img, text, portalImg } = this.state;
    return (
      <ViroARScene>
        {isLoading ? (
          <ViroSpinner position={[0, 0, -2]} scale={[1, 1, 1]} />
        ) : (
          <>
            <PortalScene portalImg={portalImg} />
          </>
        )}
      </ViroARScene>
    );
  }
}

module.exports = ARportal;
