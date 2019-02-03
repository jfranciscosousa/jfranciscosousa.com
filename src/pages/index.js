import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Header from "../components/Header";

import "./index.module.css";

export const pageQuery = graphql`
  query PageQuery {
    ...avatar
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default class HomeIndex extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const siteDescription = this.props.data.site.siteMetadata.description;

    return (
      <div styleName="root">
        <Helmet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
        </Helmet>

        <Header data={this.props.data} />

        <div styleName="content">
          <section>
            <header>
              <h2>About me</h2>
            </header>
            <p>
              I{"'"}ve been working with the web since my first year of college
              and made a living out of it, currently doing it at SV Health as a
              full-stack developer. My main tech is Rails and React, but I am
              comfortable taking a go at shiny new things, as long it{"'"}s well
              made and open source.
            </p>

            <p>
              Just a heads up: I am <b>NOT</b> available for hire, but if you
              need a consulting agency for designing and developing web products
              in the health scene get in touch with my company at{" "}
              <a href="https://svhealth.io">svhealth.io</a>
            </p>
          </section>

          <section>
            <header>
              <h2>Skills</h2>
            </header>
            <p>
              Working mainly on the web over these last few years, I{"'"}ve
              currently settled with Ruby on Rails and React professionally. I
              consider myself perfectly comfortable at both front-end and
              back-end, even extending that to DevOps and Sysadmin tasks.
            </p>

            <p>
              These are just my personal favorites, I{"'"}ve worked on far more
              technologies than that, and sometimes I{"'"}ve even opted for
              other more adequate technologies for the project at hand. I have
              worked with Java and Spring, Elixir and Phoenix and Javascript
              with Express and Next.
            </p>

            <p>
              I{"'"}m constantly trying to improve developer quality of life by
              writing clean, tested code every day. My personal motto: write a
              test for it, make it work and then make the code pretty.
            </p>

            <p>
              You can check some of my open source stuff at my{" "}
              <a href="https://github.com/jfranciscosousa">GitHub</a>. You can
              also check some charitable web development that a few kindly folk
              and me are doing at{" "}
              <a href="https://github.com/includebraga">include {"#<braga>"}</a>
            </p>
          </section>
        </div>
      </div>
    );
  }
}
