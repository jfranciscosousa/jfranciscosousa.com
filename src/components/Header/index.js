import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import { graphql } from "gatsby";

import SocialLinks from "../SocialLinks";

import styles from "./index.module.css";

export const imageFragment = graphql`
  fragment avatar on Query {
    file(relativePath: { eq: "images/avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 512, quality: 75) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default class Header extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <header className={`${styles.root} headeranim`}>
        <Image
          className={`${styles.melon} fadeinanim`}
          fluid={data.file.childImageSharp.fluid}
        />

        <div className={`${styles.description} fadeinanim`}>
          <h4>Francisco Sousa</h4>
          <h4>
            Software Developer @ <a href="https://finiam.com">finiam.com</a>
          </h4>
        </div>

        <div className="fadeinanim">
          <SocialLinks />
        </div>
      </header>
    );
  }
}
