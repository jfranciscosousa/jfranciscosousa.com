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
    const { data } = this.props;

    return (
      <header styleName="root">
        <Image styleName="melon" fluid={data.file.childImageSharp.fluid} />

        <div styleName="description">
          <h4>José Francisco Sousa</h4>
          <h4>Software Developer @ svhealth.io</h4>
        </div>

        <SocialLinks />
      </header>
    );
  }
}
