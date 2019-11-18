'use strict';

import React, { Component } from 'react';
import { locations } from '../js/data/locations'

import {
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  Image,
  Dimensions
} from 'react-native';

export default class LocationsMap extends Component {

  constructor() {
    super();

    this.state = {
      locations
    }
  }

  render() {
    const { locations } = this.state;
    // const mapHeight = Math.round(Dimensions.get('window').height * 0.33);
    return (
      <ImageBackground style={{ height: 250, width: '100%' }} source={require('./res/Manchester-Map-Small.png')} >

          {locations.map(location => {
            const locationStyle = StyleSheet.create({
              location: {
                position: 'absolute',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                left: location.left,
                top: location.top
              }
            })
            return (
              <View key={ location.name } style={ locationStyle.location }>
                <Image
                  style={styles.mapPin}
                  source={require('./res/mapPin.png')}
                />
                <Text style={styles.locationLabel}>{ location.name }</Text>
              </View>
            )
          })}  
            
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
 
  mapPin: {
    width: 38,
    height: 35
  },

  locationLabel: {
    fontFamily: 'Arial',
    borderRadius: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    padding: 4,
    textAlignVertical: 'center',
    textAlign: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }

});

module.exports = LocationsMap;