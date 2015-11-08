import React from 'react';

export default class Login extends React.Component {

  render() {
    let logins = null
    if (!this.props.isAuthenticated) {
      logins = (
        <div id="logins">
          <a href="/auth/google" alt="Login with Google" className="icon"><span className="icon-google" /></a>
        </div>
      )
    }
    return logins
  }
}
