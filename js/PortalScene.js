'use strict';

import React, { Component } from 'react';

import { StyleSheet, Platform } from 'react-native';

import { ViroAmbientLight, Viro360Video, Viro360Image, ViroPortal, ViroPortalScene, Viro3DObject, ViroSpinner } from 'react-viro';

export default class PortalScene extends Component {
  state = {
    isLoading: true // Platform.OS === 'android' ? false : true // onLoadEnd event on <Viro360Image> doesn't seem to fire on Android
  };

  portalContentLoaded = event => {
    this.setState({ isLoading: false });
  };

  render = () => {
    const { isLoading } = this.state;
    const { portalImg } = this.props;
    return (
      <>
        {isLoading ? <ViroSpinner scale={[0.5, 0.5, 0.5]} position={[0, 0, -2.1]} /> : null}
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => {}}>
          <ViroPortal scale={[0.6, 0.6, 0.6]} position={[0, 0, -2.0]}>
            <Viro3DObject
              source={require('./portals/portal_archway/portal_archway.vrx')}
              resources={[
                require('./portals/portal_archway/portal_archway_diffuse.png'),
                require('./portals/portal_archway/portal_archway_normal.png'),
                require('./portals/portal_archway/portal_archway_specular.png')
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={{ uri: portalImg }} onLoadEnd={this.portalContentLoaded} />
        </ViroPortalScene>
      </>
    );
  };
}
