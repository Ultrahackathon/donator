import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}


export default class CheckIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      geolocation: ['Loading...'],
      locations: [],
      modalIsOpen: false,
      selectedLocation: null
    }



  }

  componentWillMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition( (pos) => {
        this.setState({geolocation: [pos.coords.latitude, pos.coords.longitude]})
      })
    } else {
      this.setState({geolocation: ['foobarbaz']})
    }
  }

  componentDidMount() {
    this.props.channel.on('locations:near', payload => {
      this.setState({locations: payload.venues})
    })
    this.props.channel.on('check-in', payload => {
      console.log('Check-in result', payload)
    })
  }

  componentWillUnmount() {
    this.props.channel.off('check-in')
    this.props.channel.off('locations:near')
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.geolocation !== this.state.geolocation || nextState.locations !== this.state.locations || nextState.modalIsOpen !== this.state.modalIsOpen
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.geolocation !== this.state.geolocation) {
      this.props.channel.push('locations:near', {lat: nextState.geolocation[0], lng: nextState.geolocation[1]})
    }
   }

   openModal(loc) {
     this.setState({modalIsOpen: true, selectedLocation: loc.venue})
   }

   closeModal = () => {
     this.setState({modalIsOpen: false})
   }

   handleCheckIn = () => {
     console.log('Checked in!', this.state.selectedLocation, this.state.geolocation)
     this.props.channel.push('check-in', { location: this.state.selectedLocation, geolocation: this.state.geolocation })
     this.setState({modalIsOpen: false})
   }

  render() {
    return (
      <div>
        <h2>This is the Check-in</h2>
        <p>Location: {this.state.geolocation.join(',')}</p>
        <ul>
          {this.state.locations.map( (loc) => {
            return <li key={loc.venue.id}><a onClick={this.openModal.bind(this, loc)}>{loc.venue.name}</a></li>
          })}
        </ul>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} styles={customStyles}>
          <h3>{this.state.selectedLocation ? this.state.selectedLocation.name : ''}</h3>
          {JSON.stringify(this.state.selectedLocation)}
          <button onClick={this.closeModal}>close</button>
          <button onClick={this.handleCheckIn}>Check In</button>
        </Modal>
      </div>
    )
  }
}
