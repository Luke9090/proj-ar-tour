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
    triggerRadius: 20
  };

  componentDidMount = () => {
    if (this.state.indoors) {
      this.setState({
        currPosMerc: latLonToMerc([53.486006, -2.239878]),
        startPosMerc: latLonToMerc([53.486006, -2.239878]),
        trueHeading: findHeading(latLonToMerc([53.486006, -2.239878]), latLonToMerc([53.485874, -2.239987]))
      });
    } else {
      const watchID = navigator.geolocation.watchPosition(
        location => {
          const { initialized, startPosMerc, trueHeading } = this.state;
          const { latitude, longitude, accuracy } = location.coords;
          const newPos = [latitude, longitude];
          const newPosMerc = latLonToMerc(newPos);
          this.setState({ currPosMerc: newPosMerc, accuracy });
          if (initialized === 'success' && startPosMerc)
            this.setState(() => {
              const travelled = distanceToModel(newPosMerc, startPosMerc);
              if (trueHeading) return { currPosMerc: newPosMerc, travelled };
              if (travelled > 20) return { currPosMerc: newPosMerc, travelled, trueHeading: findHeading(startPosMerc, newPosMerc) };
            });
          if (initialized === 'success' && !startPosMerc && accuracy < 10) this.setState({ startPosMerc: newPosMerc });
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
    const { startPosMerc, accuracy, trueHeading } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        {trueHeading ? (
          <>
            <ViroAmbientLight color="#FFFFFF" />
            {locations.map(this.renderLocAsText)}
          </>
        ) : (
          <ViroText
            text={startPosMerc ? `Walk ${accuracy}` : `Initializing ${accuracy}`}
            position={[0, 0, -20]}
            style={styles.helloWorldTextStyle}
            scale={[3, 3, 3]}
          />
        )}
      </ViroARScene>
    );
  };

  renderLocAsText = ({ coords, name }, i) => {
    const { changePage, currLoc } = this.props.sceneNavigator.viroAppProps;
    const { currPosMerc, startPosMerc, trueHeading, triggerRadius } = this.state;
    const latLon = [coords._lat, coords._long];
    const objMercCoords = latLonToMerc(latLon);
    const distance = distanceToModel(startPosMerc, objMercCoords);
    const currDistance = distanceToModel(currPosMerc, objMercCoords);
    if (currDistance < triggerRadius && i !== currLoc) changePage('split', 'nav', 'arrival', i);
    if (i === currLoc && currDistance > triggerRadius) changePage('split', 'nav', 'map', null);
    const objPolarAngle = findHeading(startPosMerc, objMercCoords);
    const newPolarCoords = [objPolarAngle - trueHeading, distance];
    const newArPos = mercsFromPolar(newPolarCoords);
    const scale = distance ** 2 / (currDistance * 4);
    return (
      <>
        <Viro3DObject
          key={'dome' + name}
          source={require('../imgs/dome/glassdome2.obj')}
          position={[newArPos[0], -triggerRadius, newArPos[2]]}
          scale={[triggerRadius / 4, triggerRadius / 4, triggerRadius / 4]}
          type="OBJ"
          materials={['redDome']}
          onError={e => {
            console.log(e.nativeEvent.error);
          }}
        />
        <ViroText
          key={'text' + name}
          text={`${name} ${currDistance}m`}
          scale={[scale, scale, scale]}
          position={[newArPos[0], triggerRadius, newArPos[2]]}
          style={styles.helloWorldTextStyle}
          transformBehaviors={['billboard']}
        />
      </>
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

ViroMaterials.createMaterials({
  dome: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('../imgs/dome/Sphere.png')
  },
  redDome: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('../imgs/dome/redSphere.png')
  }
});

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
