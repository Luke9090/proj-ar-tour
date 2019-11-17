import React, { Component } from 'react';
import Splash from './js/Splash';
import { View } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import LocationsMap from './js/LocationsMap';

const ARnav = require('./js/ARnav');
const ARloc = require('./js/PortalWithSidebar');

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
          <View style={{ flex: 1 }}>
            <ViroARSceneNavigator 
              viroAppProps={sharedProps} 
              initialScene={{ scene: ARnav }} 
              worldAlignment={'GravityAndHeading'}
            />
            <LocationsMap />
          </View> 
        );
      case 'ARloc':
        return <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARloc }} worldAlignment={'GravityAndHeading'} />
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
