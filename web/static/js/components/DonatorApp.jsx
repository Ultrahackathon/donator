import '../../styles/base'

import React from 'react';
import { Link } from 'react-router'
import Header from './Header'
import Login from './Login'
import Navigation from './Navigation'


export default React.createClass({

  render() {
    return (
      <div>
        <Header />
        <div onClick={this.props.click}>
          Hello, World!
          This is donator.
        </div>
        {this.props.children}
        <Login />
        <Navigation />
    </div>
    );
  }
});
