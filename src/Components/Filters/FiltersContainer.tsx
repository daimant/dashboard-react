import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import {} from "../Redux/selectors";
import Filters from "./Filters";


interface StateWidgets {
}

class WidgetsContainer extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Filters/>
    );
  }
}

const mapState = (state: StateWidgets) => ({});

export default connect(mapState, {})(WidgetsContainer);
