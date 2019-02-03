import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import { graphql } from "gatsby";

import SocialLinks from "../SocialLinks";

import "./index.module.css";

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
    return (
      <header styleName="root">
        <div>
          <Image
            styleName="melon"
            fluid={this.props.data.file.childImageSharp.fluid}
          />
        </div>

        <div styleName="description">
          <h4>
            José Francisco Sousa. Fullstack developer working with Rails & React
            at <a href="https://svhealth.io">SV HEALTH</a>
          </h4>
        </div>

        <div styleName="social">
          <SocialLinks />
        </div>
      </header>
    );
  }
}
