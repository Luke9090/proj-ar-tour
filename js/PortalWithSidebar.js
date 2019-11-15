'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroSpinner } from 'react-viro';

import PortalScene from './PortalScene';
import Sidebar from './Sidebar';

export default class PortalWithSidebar extends Component {
  state = {
    title: 'Fake Location Data',
    img: require('../imgs/placeholder.jpg'),
    text: "Here is some fake text about this fake location. If you're seeing this in our graduation presentation then we really dropped the ball.",
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
            <Sidebar title={title} img={img} text={text} />
            <PortalScene portalImg={portalImg} />
          </>
        )}
      </ViroARScene>
    );
  }
}

module.exports = PortalWithSidebar;
