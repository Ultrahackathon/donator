import React from 'react';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.replaceState(null, '/signin')
    } else {
      this.props.channel.push('leaderboard')
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.channel.on('leaderboard', payload => {
        this.setState({users: payload.leaderboard})
      })
    }
  }

  componentWillUnmount() {
    if (this.props.channel) {
      this.props.channel.off('leaderboard')
    }
  }

  render() {
    return <div>
      <h3>Top contributors:</h3>
      {this.state.users.slice(0,10).map((user, index) => <LeaderboardRow key={index} user={user} position={index} />)}
    </div>
  }
}

export class LeaderboardRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <strong>{this.props.user.name}</strong> with <em>{this.props.user.checkin_count}</em> checkins.
    </div>
  }
}
