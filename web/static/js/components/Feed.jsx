import React from 'react';

export default class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: []
    }
  }

  componentWillMount() {
    this.props.channel.on('feed', payload => {
      this.setState({feed: this.state.feed.concat([payload])})
    })
  }

  render() {
    return <div>
      <h2>This is the Feed</h2>
      {this.state.feed.map((f) => {
        return <p>{f.name} - {f.location}</p>
      })}
    </div>
  }
}
