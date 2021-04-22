import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import {} from "../Redux/selectors";
import Widgets from "./Widgets";


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
      <Widgets/>
    );
  }
}

const mapStateToProps = (state: StateWidgets) => ({
  // serviceData: getService(state),

});

export default connect(mapStateToProps, {})(WidgetsContainer);
