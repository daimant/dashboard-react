import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import {} from "../Redux/selectors";
import Filters from "./Filters";


interface StateWidgets {

}

class WidgetsContainer extends React.Component {
  componentDidMount() {
    // if (!this.props.serviceData.length) {
    //   const { currentPage } = this.props;
    //   this.props.requestServices(currentPage);
    // }
  }

  // onPageChanged = (pageNumber) => {
  //   this.props.requestServices(pageNumber);
  // };
  render() {
    return (
      <Filters/>
    );
  }
}

const mapState = (state: StateWidgets) => ({
  // serviceData: getService(state),

});

export default connect(mapState, {})(WidgetsContainer);
