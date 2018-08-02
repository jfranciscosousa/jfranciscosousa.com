import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";

import "./index.css";

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
              Finished my Software Engineering Master{"'"}s Degree at University
              of Minho in 2017, specializing in full-stack web development
              (literal full-stack, with front-end, back-end, and
              infrastructure).
            </p>

            <p>
              Currently working at <a href="https://oncostats.io">Oncostats</a>,
              a medtech startup on the field of oncology, as a fullstack
              developer and devops engineer.
            </p>
          </section>

          <section>
            <header>
              <h2>Skills</h2>
            </header>
            <p>
              Developer as a student and hobbyist since the first year of my
              college degree (been there 5 years). Most of my coding experience
              is based on the web, having written some applications using Java
              and Ruby with frameworks such as Spring Boot, and Ruby on Rails,
              the later being my preferred choice. I also dabbled on the JS
              backend for a bit with NodeJS
            </p>

            <p>
              Lately, I have been more invested in the Javascript ecosystem,
              having experience on multiple versions of Angular, settling down
              on React (React is the best honestly, by far). A performance
              maniac, I believe optimization is an important part of front-end
              development, not being exclusive to back-end.
            </p>

            <p>
              They say good code speaks for itself, check it out on my{" "}
              <a href="https://github.com/jfranciscosousa">GitHub</a>
            </p>
          </section>

          <section>
            <h2>Get In Touch</h2>
            <p>
              If for any reason you want to contact me, do it via email, please{" "}
              <a href="mailto:josesousa9000@gmail.com">
                josesousa9000@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    );
  }
}
