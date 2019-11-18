import React, { Component } from 'react';
import Splash from './js/Splash';
import { ViroARSceneNavigator } from 'react-viro';
import ARnavMap from './js/ARnavMap'

const ARloc = require('./js/PortalWithSidebar');

class App extends Component {
  state = {
    page: 'ARnav',
    subpage: null,
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
        return <ARnavMap changePage={this.changePage} />;
      case 'ARloc':
        return <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARloc }} worldAlignment={'Gravity'} />
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
