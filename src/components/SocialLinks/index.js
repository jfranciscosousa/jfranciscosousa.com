import React from "react";

import icons from "simple-line-icons/css/simple-line-icons.css"; // eslint-disable-line no-unused-vars
import styles from "./index.css"; // eslint-disable-line no-unused-vars

export default class SocialLinks extends React.Component {
  render() {
    return (
      <div styleName="styles.root">
        <a
          href="https://www.twitter.com/xicomeme"
          styleName="styles.icon icons.icon-social-twitter"
        >
          <span style={{ display: "none" }}>Twitter</span>
        </a>

        <a
          href="https://www.github.com/jfranciscosousa"
          styleName="styles.icon icons.icon-social-github"
        >
          <span style={{ display: "none" }}>Github</span>
        </a>

        <a
          href="https://www.linkedin.com/in/jfranciscosousa/"
          styleName="styles.icon icons.icon-social-linkedin"
        >
          <span style={{ display: "none" }}>LinkedIn</span>
        </a>

        <a
          href="mailto:josesousa9000@gmail.com"
          styleName="styles.icon icons.icon-envelope-letter"
        >
          <span style={{ display: "none" }}>Mail</span>
        </a>
      </div>
    );
  }
}
