import React from "react";

import "./index.module.css";

export default class SocialLinks extends React.Component {
  render() {
    return (
      <div styleName="root">
        <a
          href="https://www.twitter.com/xicomeme"
          styleName="icon"
          className="icon-social-twitter"
        >
          <span style={{ display: "none" }}>Twitter</span>
        </a>

        <a
          href="https://www.github.com/jfranciscosousa"
          styleName="icon"
          className="icon-social-github"
        >
          <span style={{ display: "none" }}>Github</span>
        </a>

        <a
          href="https://www.linkedin.com/in/jfranciscosousa/"
          styleName="icon"
          className="icon-social-linkedin"
        >
          <span style={{ display: "none" }}>LinkedIn</span>
        </a>

        <a
          href="mailto:josesousa9000@gmail.com"
          styleName="icon"
          className="icon-envelope-letter"
        >
          <span style={{ display: "none" }}>Mail</span>
        </a>
      </div>
    );
  }
}
