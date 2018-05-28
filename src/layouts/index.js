import React from "react";
import PropTypes from "prop-types";

import "../../node_modules/simple-line-icons/css/simple-line-icons.css";
import "../../node_modules/milligram/dist/milligram.css";
import "./index.scss";

import Header from "../components/Header";

export const query = graphql`
  query LayoutQuery {
    ...avatar
  }
`;

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { children, data } = this.props;

    return (
      <div>
        <Header data={data} />
        <div className="Content">{children()}</div>
      </div>
    );
  }
}
