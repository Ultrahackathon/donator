import '../../styles/base'

import React from 'react';
import { Link } from 'react-router'
import Header from './Header'
import Login from './Login'
import Navigation from './Navigation'
import { Socket } from '../phoenix'


export default class DonatorApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      channel: null
    }
  }

  componentWillMount() {
    let socket = new Socket('/socket', {params: {token: document.cookie.split('=')[1]}})
    socket.connect()
    let channel = socket.channel('actions', {token: document.cookie.split('=')[1]})
    this.setState({channel: channel})

    channel.join()
      .receive('ok', ({messages}) => channel.push('locations:near', {lat: 60.169308699999995, lng: 24.9292901}, 10000))
      .receive('error', ({reason}) => console.log('failed join', reason) )
      .receive('timeout', () => console.log('Networking issue. Still waiting...') )
  }


  render() {
    return (
      <div>
        <Header />
        <div onClick={this.props.click}>
          Hello, World!
          This is donator.
        </div>
        {this.props.children}
        <Login />
        <Navigation />
    </div>
    );
  }
});
