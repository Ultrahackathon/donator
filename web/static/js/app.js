import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import DonatorApp from './components/DonatorApp'
import Feed from './components/Feed'
import Map from './components/Map'
import CheckIn from './components/Check-in'
import Leaderboard from './components/Leaderboard'
import Profile from './components/Profile'
import {Socket} from "./phoenix"

function connect() {
  let socket = new Socket("/socket", {params: {token: document.cookie.split('=')[1]}})
  socket.connect()
  let channel = socket.channel("actions", {token: document.cookie.split('=')[1]})

  channel.on("locations:near", payload => {
    console.log(payload)
  })
  channel.join()
    .receive("ok", ({messages}) => channel.push('locations:near', {lat: 60.169308699999995, lng: 24.9292901}, 10000))
    .receive("error", ({reason}) => console.log("failed join", reason) )
    .receive("timeout", () => console.log("Networking issue. Still waiting...") )
}
render((
  <Router>
    <Route path="/" component={DonatorApp}>
      <Route path="feed" component={Feed} />
      <Route path="map" component={Map} />
      <Route path="checkin" component={CheckIn} />
      <Route path="leaderboard" component={Leaderboard} />
      <Route path="profile" component={Profile} />
    </Route>
  </Router>
), document.getElementById('donator'))
