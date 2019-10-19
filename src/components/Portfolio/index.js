import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import projects from "./data";
import withQuery from "./withQuery";

import styles from "./index.module.css";

function Portfolio({ data }) {
  return (
    <section className={styles.root}>
      <header>
        <h2>Portfolio</h2>
      </header>

      <div className={styles.copy}>
        <p>
          Some of my stuff I&apos;ve been doing for volunteering and
          freelancing.
        </p>
      </div>

      <ul className={styles.projects}>
        {projects.map(project => (
          <li className={styles.project} key={project.key}>
            <div className={styles.projectImage}>
              <Img fluid={data[project.key].image.fluid} />
              <a
                href={project.href}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>View Project</p>
              </a>
            </div>

            <p className={styles.projectName}>{project.name}</p>

            <a
              className={styles.projectLinkMobile}
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
    </section>
  );
}

Portfolio.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withQuery(Portfolio);
