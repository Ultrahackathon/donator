import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import DonatorApp from './components/DonatorApp'
import Feed from './components/Feed'
import Map from './components/Map'
import CheckIn from './components/Check-in'
import Leaderboard from './components/Leaderboard'
import Profile from './components/Profile'

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
