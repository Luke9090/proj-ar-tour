import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import LocationsMap from './LocationsMap';

const ARnav = require('./ARnav');

class App extends Component {
  
  render() {
    const sharedProps = this.props.changePage;
    return (

      <View style={ styles.container }>
        <View style={styles.arNavContainer}>
          <ViroARSceneNavigator 
            viroAppProps={sharedProps} 
            initialScene={{ scene: ARnav }} 
            worldAlignment={'GravityAndHeading'}
            style={styles.arNavContainer}
          />
        </View>
        <View style={styles.mapContainer}>
          <LocationsMap />
        </View>
      </View> 
    
    );

  }
}

const mapHeight = Math.round(Dimensions.get('window').height * 0.4);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  arNavContainer: {
    flex: 1
  },
  mapContainer: {
    height: mapHeight
  }
});

export default App;
