import React from 'react';

export default class Login extends React.Component {

  render() {
    return (
      <div>
        <a href="/auth/github">Login with GitHub</a>&nbsp;
        <a href="/auth/facebook">Login with Facebook</a>&nbsp;
        <a href="/auth/google">Login with Google</a>
      </div>
    )
  }
}
