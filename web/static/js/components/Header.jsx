import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
  render() {
    return <header><Link to="/"><h1>donator</h1></Link></header>
  }
}
