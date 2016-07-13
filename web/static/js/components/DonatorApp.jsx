import '../../styles/base'

import React from 'react'
import { Link } from 'react-router'
import Header from './Header'
import Navigation from './Navigation'
import { Socket } from '../phoenix'
import { withRouter } from 'react-router'


class DonatorApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      channel: null,
      isAuthenticated: false
    }
  }

  componentWillMount() {
    if (document.cookie.indexOf('token') !== -1) {
      let token = document.cookie.split('token=')[1]
      let socket = new Socket('/socket', {params: {token: token}})
      socket.connect()
      let channel = socket.channel('actions', {token: token})
      this.setState({channel: channel})

      channel.join()
        .receive('ok', ({messages}) => {
          this.setState({isAuthenticated: true})
        })
        .receive('error', ({reason}) => {
          console.log('failed join', reason)
          this.setState({isAuthenticated: false})
        } )
        .receive('timeout', () => console.log('Networking issue. Still waiting...') )
    }

    if (!this.state.isAuthenticated) {
      this.props.router.push('/signin')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState
  }

  componentDidUpdate(prevProp, prevStat) {
    if (!this.state.isAuthenticated && this.props.location.pathname !== '/signin') {
      this.props.router.push('/signin')
    }
    if (this.state.isAuthenticated && this.props.location.pathname === '/') {
      this.props.router.push('/feed')
    }
  }

  logout = () => {
    this.setState({isAuthenticated: false})
    document.cookie  = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  render() {
    return (
      <div>
        <Header isAuthenticated={this.state.isAuthenticated} logout={this.logout} />

        <div className="content">
          <p>DEMO. No real money involved!</p>
          {this.props.children && React.cloneElement(this.props.children, { channel: this.state.channel, isAuthenticated: this.state.isAuthenticated })}
        </div>
        <Navigation />
    </div>
    );
  }
}

export default withRouter(DonatorApp)
