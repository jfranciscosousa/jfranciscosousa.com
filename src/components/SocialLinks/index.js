import React from "react";
import LinkedIn from "../../assets/images/linkedin.svg";
import Twitter from "../../assets/images/twitter.svg";
import Github from "../../assets/images/github.svg";
import Mail from "../../assets/images/mail.svg";

import "./index.module.css";

export default class SocialLinks extends React.Component {
  render() {
    return (
      <div styleName="root">
        <a href="https://www.twitter.com/goodxicosousa">
          <Twitter />
          <span style={{ display: "none" }}>Twitter</span>
        </a>

        <a href="https://www.github.com/jfranciscosousa">
          <Github />
          <span style={{ display: "none" }}>Github</span>
        </a>

        <a href="https://www.linkedin.com/in/jfranciscosousa/">
          <LinkedIn />
          <span style={{ display: "none" }}>LinkedIn</span>
        </a>

        <a href="mailto:josesousa9000@gmail.com">
          <Mail />
          <span style={{ display: "none" }}>Mail</span>
        </a>
      </div>
    );
  }
}
