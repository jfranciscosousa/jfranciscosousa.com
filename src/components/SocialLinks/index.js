import React from "react";
import LinkedIn from "../../assets/images/linkedin.svg";
import Twitter from "../../assets/images/twitter.svg";
import Github from "../../assets/images/github.svg";
import Mail from "../../assets/images/mail.svg";

import styles from "./index.module.css";

export default class SocialLinks extends React.Component {
  render() {
    return (
      <div className={styles.root} aria-label="My Social Links">
        <a aria-label="Twitter" href="https://www.twitter.com/goodxicosousa">
          <Twitter />
        </a>

        <a aria-label="Github" href="https://www.github.com/jfranciscosousa">
          <Github />
        </a>

        <a
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/jfranciscosousa/"
        >
          <LinkedIn />
        </a>

        <a aria-label="Email" href="mailto:josesousa9000@gmail.com">
          <Mail />
        </a>
      </div>
    );
  }
}
