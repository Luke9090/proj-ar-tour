import React, { Component } from 'react';
import Splash from './js/Splash';
import Split from './js/Split';

class App extends Component {
  state = {
    page: 'splash',
    ARpage: 'nav',
    panel: 'map',
    location: 1
  };

  changePage = (page = 'split', ARpage = 'nav', panel = 'map', location = 1) => {
    this.setState({ page, ARpage, panel, location });
  };

  render() {
    const { page, ARpage, panel, location } = this.state;
    const sharedProps = { changePage: this.changePage };
    switch (page) {
      case 'splash':
        return <Splash changePage={this.changePage} />;
      case 'split':
        return <Split changePage={this.changePage} ARpage={ARpage} panel={panel} location={location} />;
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
