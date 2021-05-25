import React, {Component} from "react";
import {connect} from "react-redux";
import {requestWidgets} from "../Redux/widgets-reducer";
import {
  selectHeightDisplay,
  // selectFilters,
  selectInf,
  selectIsFetchingWidgets,
  selectKPK,
  selectKPKTitle,
  selectSC
} from "../Redux/selectors";
import Widgets from "./Widgets";
import {WidgetsStateProps, RootState} from "../Common/Types";

class WidgetsContainer extends Component<WidgetsStateProps> {
  componentDidMount() {
    // @ts-ignore
    this.props.requestWidgets();
  }

  render() {
    return (
      <Widgets
        kpk={this.props.kpk}
        sc={this.props.sc}
        inf={this.props.inf}
        isFetchingWidgets={this.props.isFetchingWidgets}
        kpkTitle={this.props.kpkTitle}
        heightDisplay={this.props.heightDisplay}
      />
    );
  }
}

const mapState = (state: RootState) => ({
  kpk: selectKPK(state),
  sc: selectSC(state),
  inf: selectInf(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  // filters: selectFilters(state),
  kpkTitle: selectKPKTitle(state),
  heightDisplay:selectHeightDisplay(state),
});

// @ts-ignore
export default connect<WidgetsStateProps, {}, {}>(mapState, {requestWidgets})(WidgetsContainer);
