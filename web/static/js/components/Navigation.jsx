import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {

  render() {
    return (
      <div className="nav-container">
        <nav>
          <Link to="/feed"><span className="icon-users" /></Link>&nbsp;
          <Link to="/map" alt="Map"><span className="icon-map" /></Link>&nbsp;
          <Link to="/checkin" alt="Check-in"><span className="icon-checkin" /></Link>&nbsp;
          <Link to="/leaderboard"><span className="icon-list-numbered" /></Link>&nbsp;
          <Link to="/profile"><span className="icon-user" /></Link>&nbsp;
        </nav>
      </div>
    )
  }
}
