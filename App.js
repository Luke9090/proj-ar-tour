import React, { Component } from 'react';
import Splash from './js/Splash';
import Split from './js/Split';

class App extends Component {
  state = {
    page: 'splash', // splash split
    ARpage: 'nav', // nav portal
    panel: 'map', // map arrival content
    currLoc: 1
  };

  changePage = (page = 'split', ARpage = 'nav', panel = 'map', currLoc = 1) => {
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
