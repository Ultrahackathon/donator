import '../../styles/base'

import React from 'react'
import { Link } from 'react-router'
import Header from './Header'
import Navigation from './Navigation'
import { Socket } from '../phoenix'


export default class DonatorApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      channel: null,
      isAuthenticated: false
    }
  }

  componentWillMount() {
    let socket = new Socket('/socket', {params: {token: document.cookie.split('=')[1]}})
    socket.connect()
    let channel = socket.channel('actions', {token: document.cookie.split('=')[1]})
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

    if (!this.state.isAuthenticated) {
      this.props.history.pushState(null, '/signin')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState
  }

  componentDidUpdate(prevProp, prevStat) {
    if (!this.state.isAuthenticated && this.props.location.pathname !== '/signin') {
      this.props.history.pushState(null, '/signin')
    }
  }

  render() {
    console.log('render', this.state, this.props)
    return (
      <div>
        <Header />
        <div >
          Hello, World!
          This is donator.
        </div>
        {this.props.children && React.cloneElement(this.props.children, { channel: this.state.channel, isAuthenticated: this.state.isAuthenticated })}
        <Navigation />
    </div>
    );
  }
}
