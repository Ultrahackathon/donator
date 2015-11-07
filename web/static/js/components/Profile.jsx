import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        name: '',
        email: '',
        checkins: []
      },
      transactions: []
    }
  }

  componentWillMount() {
    this.props.channel.on('user', payload => {
      this.setState(payload)
    })
    this.props.channel.push('user')
  }

  render() {
    const charity_total = this.state.transactions.reduce(function(total, transaction) {
      return total + parseInt(transaction.sum, 10);
    }, 0)

    return <div>
      <h2>This is the Profile</h2>
      <h3>{this.state.user.name} - {this.state.user.checkins.length} checkins</h3>
      <p>{this.state.user.email}</p>
      <p>Charity total: {charity_total / 100}€</p>
    </div>
  }
}
