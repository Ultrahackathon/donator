import React from 'react';

export default class Login extends React.Component {

  render() {
    return (
      <div>
        <a href="/auth/github">Login with GitHub</a>
        <a href="/auth/facebook">Login with Facebook</a>
        <a href="/auth/google">Login with Google</a>
      </div>
    )
  }
}
