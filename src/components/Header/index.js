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
        sizes(maxWidth: 3000) {
          ...GatsbyImageSharpSizes
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
            sizes={this.props.data.file.childImageSharp.sizes}
          />
        </div>

        <div styleName="description">
          <h4>
            José Francisco Sousa. Fullstack developer, experience in Ruby on
            Rails and React. Currently working at{" "}
            <a href="https://oncostats.io">oncostats</a>
          </h4>
        </div>

        <div styleName="social">
          <SocialLinks />
        </div>
      </header>
    );
  }
}
