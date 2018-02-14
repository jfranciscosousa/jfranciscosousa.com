import React from "react";

import Footer from "./Footer";
import avatar from "../assets/images/avatar.jpg";

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div className="inner">
          <a href="#" className="image avatar">
            <img src={avatar} alt="" />
          </a>
          <h1>
            José Francisco Sousa. Fullstack developer, experience in Ruby on
            Rails and React. Currently working at{" "}
            <a href="https://oncostats.io">oncostats</a>
          </h1>
        </div>
        <Footer />
      </header>
    );
  }
}

export default Header;
