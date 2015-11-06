import React from 'react';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }

    this.props.channel.on('leaderboard', payload => {
      this.setState({users: payload.leaderboard})
    })
    this.props.channel.push('leaderboard')

  }

  render() {
    return <div>
      <h2>This is the Leaderboard</h2>
      {this.state.users.map((user, index) => <LeaderboardRow key={index} user={user} position={index} />)}
    </div>
  }
}

export class LeaderboardRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <b>{this.props.user.name} {this.props.user.checkin_count} Checkins</b>
    </div>
  }
}
