import React from "react";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  query {
    muro: file(relativePath: { eq: "images/muro.png" }) {
      image: childImageSharp {
        fluid(maxWidth: 2160, quality: 75) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    osteovida: file(relativePath: { eq: "images/osteovida.png" }) {
      image: childImageSharp {
        fluid(maxWidth: 2160, quality: 75) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    santa: file(relativePath: { eq: "images/santa.png" }) {
      image: childImageSharp {
        fluid(maxWidth: 2160, quality: 75) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default Component => () => (
  <StaticQuery query={query} render={data => <Component data={data} />} />
);
