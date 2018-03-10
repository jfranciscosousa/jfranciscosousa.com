import React from "react";

import "./index.scss";

export default class SocialLinks extends React.Component {
  render() {
    return (
      <div className="SocialLinks">
        <div>
          <a
            href="https://www.twitter.com/josesousa9000"
            className="SocialLinks-icon icon-social-twitter"
          >
            <span style={{ display: "none" }}>Twitter</span>
          </a>

          <a
            href="https://www.github.com/jfranciscosousa"
            className="SocialLinks-icon icon-social-github"
          >
            <span style={{ display: "none" }}>Github</span>
          </a>

          <a
            href="mailto:josesousa9000@gmail.com"
            className="SocialLinks-icon icon-envelope-letter"
          >
            <span style={{ display: "none" }}>Mail</span>
          </a>
        </div>
        <div className="SocialLinks-copyright">
          <div>
            Design: <a href="http://html5up.net">HTML5 UP</a>
          </div>
        </div>
      </div>
    );
  }
}
