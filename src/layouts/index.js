import React from "react";
import PropTypes from "prop-types";

import "../styles/reset.css";
import "../styles/typography.css";

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {children()}
      </div>
    );
  }
}
