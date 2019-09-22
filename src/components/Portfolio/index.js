import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import projects from "./data";
import withQuery from "./withQuery";

import "./index.module.css";

function Portfolio({ data }) {
  return (
    <div>
      <header>
        <h2>Portfolio</h2>
      </header>

      <div styleName="copy">
        <p>
          Some of my stuff I&apos;ve been doing for volunteering and
          freelancing.
        </p>
      </div>

      <ul styleName="projects">
        {projects.map(project => (
          <li styleName="project" key={project.key}>
            <div styleName="project-image">
              <Img fluid={data[project.key].image.fluid} />
              <a
                href={project.href}
                styleName="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>View Project</p>
              </a>
            </div>

            <p styleName="project-name">{project.name}</p>

            <a
              styleName="project-link-mobile"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden="true"
            >
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Portfolio.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withQuery(Portfolio);
