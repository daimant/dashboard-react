import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import {getInf, getKPK, getSC} from "../Redux/selectors";
import Widgets from "./Widgets";
import {WidgetsStateProps, RootState} from "../Common/Types";

class WidgetsContainer extends React.Component<WidgetsStateProps> {
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
    // console.log('widgets container', this.props)
    return (
      <Widgets
        kpk={this.props.kpk}
        sc={this.props.sc}
        inf={this.props.inf}
      />
    );
  }
}

const mapState = (state: RootState) => ({
  kpk: getKPK(state),
  sc: getSC(state),
  inf: getInf(state),
});

// @ts-ignore
export default connect<WidgetsStateProps, {},{}>(mapState, {})(WidgetsContainer);
