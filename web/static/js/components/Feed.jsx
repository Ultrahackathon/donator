import React from 'react'
import Gravatar from 'react-gravatar'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: []
    }
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.replaceState(null, '/signin')
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.channel.on('feed', payload => {
        this.setState({feed: this.state.feed.concat(payload.feed)})
      })

      this.props.channel.push('feed')
    }
  }

  render() {
    let content
    if (this.state.feed.length === 0) {
      content = (<div className="loading"><span className="icon-spinner2" /></div>)
    } else {
      content = (
        <div>
          <h4>Whats going on:</h4>
          <ul className="feed-items">
          {this.state.feed.map((f, i) => {
            return <li className="item feed-item" key={i}>{f.email ? <Gravatar md5={f.email} https /> : ''} <strong>{f.name}</strong> at <em>{f.location}</em>. <small>Donation of {f.sum / 100} € to <em>{f.target}</em></small></li>
          })}
        </ul>
        </div>
      )
    }
    return content
  }
}
