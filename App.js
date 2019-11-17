import React, { Component } from 'react';
import Splash from './js/Splash';
import { StyleSheet, View, Dimensions } from 'react-native';
// import ARnav from './js/ARnav';
import { ViroARSceneNavigator } from 'react-viro';
import LocationsMap from './js/LocationsMap';

const ARnav = require('./js/ARnav');
const ARloc = require('./js/PortalWithSidebar');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  arNav: {
    height: Math.round(Dimensions.get('window').height * 0.7)
  },
  map: {
    height: Math.round(Dimensions.get('window').height * 0.3)
  },
});

class App extends Component {
  state = {
    page: 'ARnav',
    subpage: null
  };

  changePage = (page = 'splash', subpage = 'null') => {
    this.setState({ page, subpage });
  };

  render() {
    const { page, subpage } = this.state;
    const sharedProps = { changePage: this.changePage };
    switch (page) {
      case 'splash':
        return <Splash changePage={this.changePage} />;
      case 'ARnav':
        return (
          <View style={styles.container}>
            <ViroARSceneNavigator 
              viroAppProps={sharedProps} 
              initialScene={{ scene: ARnav }} 
              worldAlignment={'GravityAndHeading'}
              style={styles.arNav}
            />
            <LocationsMap style={styles.map}/>
          </View> 
        );
      case 'ARloc':
        return <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARloc }} worldAlignment={'GravityAndHeading'} />  
      case 'map':
        return <LocationsMap />
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
