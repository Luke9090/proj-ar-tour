import React, { Component } from 'react';
import Splash from './js/Splash';
import Split from './js/Split';

class App extends Component {
  state = {
    page: 'splash', // OPTIONS: splash split - DEFAULT: splash
    ARpage: 'nav', // OPTIONS: nav portal - DEFAULT: nav
    panel: 'map', // OPTIONS: map arrival content - DEFAULT: map
    currLoc: null // number - index of current location in locations array - DEFAULT: null
  };

  changePage = (page = 'splash', ARpage = 'nav', panel = 'map', currLoc = null) => {
    this.setState({ page, ARpage, panel, currLoc });
  };

  render() {
    const { page, ARpage, panel, currLoc } = this.state;
    switch (page) {
      case 'splash':
        return <Splash changePage={this.changePage} />;
      case 'split':
        return <Split changePage={this.changePage} ARpage={ARpage} panel={panel} currLoc={currLoc} />;
      default:
        return <Splash changePage={this.changePage} />;
    }
  }
}

export default App;
