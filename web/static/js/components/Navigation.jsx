import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {

  render() {
    return (
      <div className="nav-container">
        <nav>
          <Link to="/feed">Feed</Link>&nbsp;
          <Link to="/map">Map</Link>&nbsp;
          <Link to="/checkin">Check in</Link>&nbsp;
          <Link to="/leaderboard">Leaderboard</Link>&nbsp;
          <Link to="/profile">Profile</Link>&nbsp;
        </nav>
      </div>
    )
  }
}
