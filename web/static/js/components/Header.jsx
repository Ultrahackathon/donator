import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
  render() {
    let logout = null
    if (this.props.isAuthenticated) {
      logout = (<Link to="/" className="logout" onClick={this.props.logout} alt="Logout"><span className="icon-exit" /></Link>)
    }
    return (
      <header>
        <a className="contact" href="mail:contact@donator.io">contact@donator.io</a>
        {logout}
        <Link className="logo" to="/"><h1>donator</h1></Link>
      </header>)
  }
}
