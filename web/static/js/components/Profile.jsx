import React from 'react'
import Gravatar from 'react-gravatar'

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
    if (!this.props.isAuthenticated) {
      this.props.history.replaceState(null, '/signin')
    } else {
      this.props.channel.on('user', payload => {
        this.setState(payload)
      })
      this.props.channel.push('user')
    }
  }

  render() {
    const charity_total = this.state.transactions.reduce(function(total, transaction) {
      return total + parseInt(transaction.sum, 10);
    }, 0)
    
    return <div>
      
      <h3>{this.state.user.email ? <Gravatar email={this.state.user.email} https /> : ''} {this.state.user.name}</h3>
      <p>{this.state.user.checkins.length} checkins</p>
      <p>Total donations gathered: {charity_total / 100}€</p>
    </div>
  }
}
