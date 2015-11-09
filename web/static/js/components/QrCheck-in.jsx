import React from 'react'

export default class QrCheckIn extends React.Component {

  constructor(props) {
    super(props)
    console.log('QCI - consrtuct')
    this.state = {
      geolocation: [],
      selectedLocation: null,
      width: 320,    // We will scale the photo width to this
      height: 0,     // This will be computed based on the input stream

      streaming: false,

      video: null,
      canvas: null,
      photo: null,
      startbutton: null
    }
  }

  componentWillMount() {
    console.log('QCI - CWM')
    if (!this.props.isAuthenticated) {
      this.props.history.replaceState(null, '/signin')
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( (pos) => {
          this.setState({geolocation: [pos.coords.latitude, pos.coords.longitude]})
        })
      } else {
        this.setState({geolocation: ['foobarbaz']})
      }
    }
  }

  startup = () => {

    navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia)
     navigator.getMedia(
     {
       video: true,
       audio: false
     },
     (stream) => {
       if (navigator.mozGetUserMedia) {
         this.state.video.mozSrcObject = stream;
       } else {
         var vendorURL = window.URL || window.webkitURL;
         this.state.video.src = vendorURL.createObjectURL(stream);
       }
       this.state.video.play();
     },
     function(err) {
       console.log("An error occured! " + err);
     }
   )
   this.state.video.addEventListener('canplay', (ev) => {
   if (!this.state.streaming) {
     this.state.height = this.state.video.videoHeight / (this.state.video.videoWidth / this.state.width);

     // Firefox currently has a bug where the height can't be read from
     // the video, so we will make assumptions if this happens.

     if (isNaN(this.state.height)) {
       this.state.height = this.state.width / (4/3);
     }

     this.state.video.setAttribute('width', this.state.width);
     this.state.video.setAttribute('height', this.state.height);
     this.state.canvas.setAttribute('width', this.state.width);
     this.state.canvas.setAttribute('height', this.state.height);
     this.state.streaming = true;
   }
 }, false);
 this.state.startbutton.addEventListener('click', (ev) => {
      this.takepicture();
      ev.preventDefault();
    }, false);
    this.clearphoto();
 }
 clearphoto = () => {
    var context = this.state.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);

    var data = this.state.canvas.toDataURL('image/png');
    this.state.photo.setAttribute('src', data);
  }

  takepicture = () => {
    var context = this.state.canvas.getContext('2d');
    if (this.state.width && this.state.height) {
      this.state.canvas.width = this.state.width;
      this.state.canvas.height = this.state.height;
      context.drawImage(this.state.video, 0, 0, this.state.width, this.state.height);

      var data = this.state.canvas.toDataURL('image/png');
      this.state.photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  }

  componentDidMount() {
    video = document.getElementById('video')
    canvas = document.getElementById('canvas')
    photo = document.getElementById('photo')
    startbutton = document.getElementById('startbutton')
    console.log('CDM', video, this.state.video)
    if (video) this.setState({ video: video })
    if (canvas) this.setState({ canvas: canvas })
    if (photo) this.setState({ photo: photo })
    if (startbutton) this.setState({ startbutton: startbutton })
    if (this.props.isAuthenticated) {
      this.props.channel.on('locations:near', payload => {
        this.setState({locations: payload.venues})
      })
      this.props.channel.on('check-in', payload => {
        console.log('Check-in result', payload)
      })
    }
  }

  componentWillUnmount() {
    console.log('CWU');
    if (this.props.channel) {
      this.props.channel.off('check-in')
      this.props.channel.off('locations:near')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('SCU', nextState.video, this.state.video)
    return this.props !== nextProps || this.state !== nextState
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('CWU');
   }

  componentDidUpdate(prevProps, prevState) {
    console.log('CDU');
    this.startup()
   }

   openModal(loc) {
     this.setState({modalIsOpen: true, selectedLocation: loc})
   }

   closeModal = () => {
     this.setState({modalIsOpen: false})
   }

   handleCheckIn = () => {
     console.log('Checked in!', this.state.selectedLocation, this.state.geolocation)
     this.props.channel.push('check-in', { location: this.state.selectedLocation.venue, geolocation: this.state.geolocation })
     this.setState({modalIsOpen: false})
   }

  render() {

    return (
      <div>
        <span style={{display: 'none'}}>{this.state.geolocation.join(',')}</span>
          <div className="camera">
            <video id="video">Video stream not available.</video>
            <button id="startbutton">Take photo</button>
          </div>
          <canvas id="canvas">
          </canvas>
          <div className="output">
            <img id="photo" alt="The screen capture will appear in this box." />
          </div>
      </div>
    )
  }
}
