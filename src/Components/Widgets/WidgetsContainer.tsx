import React from "react";
import {connect} from "react-redux";
import {} from "../Redux/widgets-reducer";
import {getInf, getKPK, getSC} from "../Redux/selectors";
import Widgets from "./Widgets";
import {MapStateProps, RootState} from "../Common/Types";

class WidgetsContainer extends React.Component<MapStateProps> {
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

export default connect(mapState, {})(WidgetsContainer);
