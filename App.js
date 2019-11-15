import React, { Component } from 'react';
import Splash from './js/Splash';
import ARnav from './js/ARnav';

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
    switch (page) {
      case 'splash':
        return <Splash changePage={this.changePage} />;
      case 'ARnav':
        return <ARnav changePage={this.changePage} />;
      // case 'ARloc':
      //   return <ARloc changePage={this.changePage} />;
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
