import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {

  render() {
    return (
      <div className="nav-container">
        <nav>
          <Link id="feed" to="/feed" activeClassName="active"><span className="icon-users" /></Link>&nbsp;
          <Link id="map" to="/map" alt="Map" activeClassName="active"><span className="icon-map" /></Link>&nbsp;
          <Link id="checkin" to="/checkin" alt="Check-in" activeClassName="active"><span className="icon-checkin" /></Link>&nbsp;
          <Link id="leaderboard" to="/leaderboard" activeClassName="active"><span className="icon-list-ol" /></Link>&nbsp;
          <Link id="profile" to="/profile" activeClassName="active"><span className="icon-user" /></Link>&nbsp;
        </nav>
      </div>
    )
  }
}
