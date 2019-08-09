import React from "react";
import PropTypes from "prop-types";

import "../../styles/reset.css";
import "../../styles/typography.css";
import "../../styles/animations.css";

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}
