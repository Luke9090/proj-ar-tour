import React, { Component } from 'react';
import Splash from './js/Splash';
// import ARnav from './js/ARnav';
import { ViroARSceneNavigator } from 'react-viro';

const ARnav = require('./js/ARnav');
const ARloc = require('./js/PortalWithSidebar');

class App extends Component {
  state = {
    page: 'splash',
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
        return <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARnav }} worldAlignment={'GravityAndHeading'} />;
      case 'ARloc':
        return <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARloc }} worldAlignment={'GravityAndHeading'} />;
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
