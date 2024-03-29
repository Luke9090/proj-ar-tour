import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, LayoutAnimation, Platform, UIManager } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';
import LocationsMap from './LocationsMap';
import Content from './Content';
import Arrival from './Arrival';

const ARnav = require('./ARnav');
const ARportal = require('./ARportal');

export default class Split extends Component {
  constructor() {
    super();

    this.state = {
      expanded: true,
      locations: [],
      isLoaded: false,
      currCoords: [],
      useCompass: false
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount = () => {
    // fetch location data from backend - hardcoded for now
    this.setState({ locations: require('./data/locations'), isLoaded: true });
  };

  updateCurrCoords = currCoords => {
    this.setState({ currCoords });
  };

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { changePage, ARpage, panel, currLoc } = this.props;
    const { expanded, locations, isLoaded, currCoords, useCompass } = this.state;
    const sharedProps = { changePage, currLoc, locations, updateCurrCoords: this.updateCurrCoords, useCompass };
    if (isLoaded)
      return (
        <View style={styles.container}>
          <View style={styles.arNavContainer}>
            {ARpage === 'nav' && (
              <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARnav }} worldAlignment={useCompass ? 'GravityAndHeading' : 'Gravity'} />
            )}
            {ARpage === 'portal' && <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARportal }} worldAlignment={'Gravity'} />}
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.btn}>
            <Text style={styles.btnText}>{expanded ? 'Collapse' : 'Expand'}</Text>
          </TouchableOpacity>

          <View
            style={{
              ...styles.mapContainer,
              height: expanded ? null : 0,
              overflow: 'hidden'
            }}
          >
            {panel === 'map' && <LocationsMap changePage={changePage} locations={locations} currCoords={currCoords} />}

            {panel === 'arrival' && <Arrival changePage={changePage} name={locations[currLoc].name} currLoc={currLoc} />}

            {panel === 'content' && <Content changePage={changePage} currLoc={currLoc} />}
          </View>
        </View>
      );
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  arNavContainer: {
    flex: 1
  },

  btn: {
    flex: 0,
    paddingTop: 10
    // backgroundColor: "rgba(0,0,0,0.5)"
  },

  mapContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: '100%'
  },

  text: {
    fontSize: 17,
    color: 'white',
    paddingTop: 0
  },

  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }
});
