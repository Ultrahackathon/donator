import React from 'react';

export default class CheckIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {geolocation: ['empty']}
  }

  componentWillMount() {
    if ('geolocation' in navigator) {
      this.setState({geolocation: ['notempty']})
      navigator.geolocation.getCurrentPosition( (pos) => {
        this.setState({geolocation: [pos.coords.latitude, pos.coords.longitude]})
      })
    } else {
      this.setState({geolocation: ['foobarbaz']})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.geolocation !== this.state.geolocation
  }


  render() {
    return (
      <div>
        <h2>This is the Check-in</h2>
        <p>Location: {this.state.geolocation.join(',')}</p>
      </div>
    )
  }
}
