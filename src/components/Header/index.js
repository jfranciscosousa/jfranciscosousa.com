import React from "react";

import SocialLinks from "../SocialLinks";
import avatar from "../../assets/images/avatar.jpg";

import "./index.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="Header container">
        <div className="inner">
          <img src={avatar} className="Header-melao" alt="Me" />

          <div className="Header-description">
            <h1>
              José Francisco Sousa. Fullstack developer, experience in Ruby on
              Rails and React. Currently working at{" "}
              <a href="https://oncostats.io">oncostats</a>
            </h1>
          </div>
        </div>
        <SocialLinks />
      </header>
    );
  }
}

export default Header;
