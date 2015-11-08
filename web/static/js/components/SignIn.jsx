import React from 'react';
import Login from './Login'

export default class SignIn extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props

    if (location.state && location.state.nextPathname) {
      this.props.history.replaceState(null, location.state.nextPathname)
    } else {
      this.props.history.replaceState(null, '/feed')
    }
  }

  render() {
    return (
      <div>
        <h2>Please sign in:</h2>
        <Login isAuthenticated={this.props.isAuthenticated} />
      </div>
    )
  }
}
