import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      checkins: []
    }
  }

  componentWillMount() {
    this.props.channel.on('user', payload => {
      this.setState(payload)
    })
    this.props.channel.push('user')
  }

  render() {
    return <div>
      <h2>This is the Profile</h2>
      <h3>{this.state.name} - {this.state.checkins.length} checkins</h3>
      <p>{this.state.email}</p>
    </div>
  }
}
