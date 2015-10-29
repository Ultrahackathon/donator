import React from 'react';

export default class Navigation extends React.Component {

  render() {
    return (
      <div className="nav-container">
        <nav>
          <a href="#">Feed</a>&nbsp;
          <a href="#">Map</a>&nbsp;
          <a href="#">Check in</a>&nbsp;
          <a href="#">Leaderboards</a>&nbsp;
          <a href="#">Profile</a>
        </nav>
      </div>
    )
  }
}
