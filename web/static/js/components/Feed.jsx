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
    return <div>
      <h2>Happening nearby</h2>
      {this.state.feed.map((f) => {
        return <p>{f.email ? <Gravatar md5={f.email} https /> : ""} {f.name} - {f.location}</p>
      })}
    </div>
  }
}
