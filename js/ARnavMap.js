import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, LayoutAnimation, Platform, UIManager } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';
import LocationsMap from './LocationsMap';
import Content from './Content';
import Arrival from './Arrival';

const ARnav = require('./ARnav');

export default class ARnavMap extends Component {
  constructor() {
    super();

    this.state = {
      expanded: true,
      mapShowing: false,
      arrivalShowing: true,
      contentShowing: false
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expanded: !this.state.expanded
    });
  };

  handleArrivalChange = () => {
    const { arrivalShowing, contentShowing } = this.state;

    this.setState({ arrivalShowing: false, contentShowing: true });
  };

  render() {
    const sharedProps = { changePage: this.props.changePage };
    const { mapShowing, arrivalShowing, contentShowing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.arNavContainer}>
          <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARnav }} worldAlignment={'Gravity'} />
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.btn}>
          <Text style={styles.btnText}>Expand / Collapse</Text>
        </TouchableOpacity>

        <View
          style={{
            ...styles.mapContainer,
            height: this.state.expanded ? null : 0,
            overflow: 'hidden'
          }}
        >
          {mapShowing && <LocationsMap />}

          {arrivalShowing && <Arrival handleArrivalChange={this.handleArrivalChange} />}

          {contentShowing && <Content />}
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
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
  }
});
