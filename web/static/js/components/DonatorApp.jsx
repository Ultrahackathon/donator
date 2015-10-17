import React from 'react';
import Header from './Header'
import Login from './Login'

export default React.createClass({

  render() {
    return (
      <div>
        <Header />
        <div>
          Hello, World!
          This is donator.
        </div>
        <Login />
    </div>
    );
  }
});
