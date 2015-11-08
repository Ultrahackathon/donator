import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {

  render() {
    return (
      <div className="nav-container">
        <nav>
          <Link className="nav-button" id="feed" to="/feed" activeClassName="active"><span className="icon-users2" /></Link>&nbsp;
          <Link className="nav-button" id="map" to="/map" alt="Map" activeClassName="active"><span className="icon-map" /></Link>&nbsp;
          <Link className="nav-button" id="checkin" to="/checkin" alt="Check-in" activeClassName="active"><span className="icon-checkin2" /></Link>&nbsp;
          <Link className="nav-button" id="leaderboard" to="/leaderboard" activeClassName="active"><span className="icon-list-ol" /></Link>&nbsp;
          <Link className="nav-button" id="profile" to="/profile" activeClassName="active"><span className="icon-user2" /></Link>&nbsp;
        </nav>
      </div>
    )
  }
}
