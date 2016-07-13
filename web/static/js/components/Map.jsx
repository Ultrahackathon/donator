import React from 'react';
import {GoogleMap, GoogleMapLoader, Marker} from 'react-google-maps';
import { withRouter } from 'react-router'

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      geolocation: [60.192932, 24.946743800000004], // default center Ultrahack
      locations: [],
      markers: [],
    }
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.router.replace('/signin')
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( (pos) => {
          this.setState({geolocation: [pos.coords.latitude, pos.coords.longitude]})
          this.props.channel.on('locations:all', payload => {
            const markers = payload.locations.map(location => {
              return {position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)}}
            })

            this.setState({markers: markers})
          })
          this.props.channel.push('locations:all')
        })
      } else {
        this.setState({geolocation: [25.0112183, 121.52067570000001]})
      }
    }
  }

  render() {
    return (
      <div>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              className="google-maps"
            />
          }
          googleMapElement={
            <GoogleMap
              ref={map}
              defaultZoom={14}
              defaultCenter={{lat: this.state.geolocation[0], lng: this.state.geolocation[1]}}
              >
              {this.state.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker} />
                );
              })}
            </GoogleMap>
          }
        />
      </div>
    );

  }
}

export default withRouter(Map)
