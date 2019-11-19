import React, { Component } from 'react';
import Splash from './js/Splash';
import { ViroARSceneNavigator } from 'react-viro';
import ARnavMap from './js/ARnavMap';

const ARloc = require('./js/PortalWithSidebar');

class App extends Component {
  state = {
    page: 'splash',
    ARpage: 'nav',
    panel: 'map'
  };

  changePage = (page = 'ARnav', ARpage = 'nav', panel = 'map') => {
    this.setState({ page, ARpage, panel });
  };

  render() {
    const { page, ARpage, panel } = this.state;
    const sharedProps = { changePage: this.changePage };
    switch (page) {
      case 'splash':
        return <Splash changePage={this.changePage} />;
      case 'split':
        return <Split changePage={this.changePage} ARpage={ARpage} panel={panel} />;
      case 'ARnav':
        return <ARnavMap changePage={this.changePage} />;
      case 'ARloc':
        return <ViroARSceneNavigator viroAppProps={sharedProps} initialScene={{ scene: ARloc }} worldAlignment={'Gravity'} />;
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
