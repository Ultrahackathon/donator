import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
  render() {
    let logout = null
    if (this.props.isAuthenticated) {
      logout = (<Link to="/" onClick={this.props.logout}>Logout</Link>)
    }
    return (
      <header>
        {logout}
        <Link className="logo" to="/"><h1>donator</h1></Link>
      </header>)
  }
}
