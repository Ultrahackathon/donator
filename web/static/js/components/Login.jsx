import React from 'react';

export default class Login extends React.Component {

  render() {
    let logins = null
    if (!this.props.isAuthenticated) {
      logins = (
        <div id="logins">
          <span alt="Login with GitHub" className="icon disabled"><span className="icon-github" /></span>&nbsp;
          <span alt="Login with Facebook" className="icon disabled"><span className="icon-facebook3" /></span>&nbsp;
          <a href="/auth/google" alt="Login with Google" className="icon"><span className="icon-google" /></a>
        </div>
      )
    }
    return logins
  }
}
