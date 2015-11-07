import React from 'react';
import Login from './Login'

export default class Feed extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    this.props.history.pushState(null, '/feed')
  }

  render() {
    return (
      <div>
        <h2>Please Sign in</h2>
        <Login isAuthenticated={this.props.isAuthenticated} />
      </div>
    )
  }
}
