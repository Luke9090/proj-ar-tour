import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';
import LocationsMap from './LocationsMap';

const ARnav = require('./ARnav');

export default class ARnavMap extends Component {

  constructor() {
    super();
 
    this.state = { 
      expanded: true,
    }
 
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
 
  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ 
      expanded: !this.state.expanded,
    });
  }
 
  render() {
    const sharedProps = { changePage: this.props.changePage };
    return (
      <View style={ styles.container }>

        <View style={ styles.arNavContainer }>

          <ViroARSceneNavigator
            viroAppProps={sharedProps}
            initialScene={{ scene: ARnav }} 
            worldAlignment={'Gravity'}
          />
   
        </View> 

        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.btn}>
          <Text style={styles.btnText}>Expand / Collapse</Text>
        </TouchableOpacity>

        <View style={{
          ...styles.mapContainer,
          height: this.state.expanded ? null : 0, 
          overflow: 'hidden'
        }}>
          <LocationsMap />
        </View>

      </View>
      
    );
  }
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },

  arNavContainer: {
    flex: 1
  },

  btn: {
    flex: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  mapContainer: {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    width: '100%'
  },
   
  text: {
    fontSize: 17,
    color: 'white',
    padding: 10
  },
 
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },

});