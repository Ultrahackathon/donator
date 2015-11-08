import React from 'react';

export default class Login extends React.Component {

  render() {
    let logins = null
    if (!this.props.isAuthenticated) {
      logins = (
        <div id="logins">
          <a href="/auth/github" alt="Login with GitHub" className="icon"><span className="icon-github" /></a>&nbsp;
          <a href="/auth/facebook" alt="Login with Facebook" className="icon"><span className="icon-facebook3" /></a>&nbsp;
          <a href="/auth/google" alt="Login with Google" className="icon"><span className="icon-google" /></a>
        </div>
      )
    }
    return logins
  }
}
