'use strict';

import React, { Component } from 'react';
import { locations } from '../js/data/locations'

import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
export default class LocationsMap extends Component {

  constructor() {
    super();
    this.state = {
      locations
    }
  }

  render() {
    const { locations } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.arViewContainer}>
          <Text style={styles.locationsTextStyle}>AR View container</Text>
        </View>
        <ImageBackground source={require('./res/Manchester-Map-Small.png')} style={styles.background}>
          <Text style={styles.locationsTextStyle}>Locations</Text>

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
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  arViewContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'grey'
  },
  locationsTextStyle: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
  background: {
    flex: 1,
    position: 'relative'
  },
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