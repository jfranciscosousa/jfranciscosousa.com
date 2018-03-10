import React from "react";
import PropTypes from "prop-types";

import "../../node_modules/simple-line-icons/css/simple-line-icons.css";
import "../../node_modules/milligram/dist/milligram.css";
import "./index.scss";

import Header from "../components/Header";

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        <div className="Content">{children()}</div>
      </div>
    );
  }
}
