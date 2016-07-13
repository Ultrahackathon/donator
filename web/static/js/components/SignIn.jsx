import React from 'react';
import Login from './Login'
import { withRouter } from 'react-router'

class SignIn extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props

    if (location.state && location.state.nextPathname) {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/feed')
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

export default withRouter(SignIn)
