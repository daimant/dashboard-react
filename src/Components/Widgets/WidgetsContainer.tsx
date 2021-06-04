import React, {Component} from "react";
import {connect} from "react-redux";
import {requestKPKChild, removeKPKChild, requestWidgets} from "../Redux/widgets-reducer";
import {
  selectHeightDisplay, selectInf, selectIsFetchingWidgets, selectKPK, selectOrgOid, selectPeriod,
  selectPeriodType, selectSC
} from "../Redux/selectors";
import Widgets from "./Widgets";
import {WidgetsStateProps, RootState} from "../Common/Types";

class WidgetsContainer extends Component<any> {
  componentDidMount() {
    this.props.requestWidgets(this.props.orgOid, this.props.period, this.props.periodType);
  }

  render() {
    return (
      <Widgets
        kpk={this.props.kpk}
        sc={this.props.sc}
        inf={this.props.inf}
        isFetchingWidgets={this.props.isFetchingWidgets}
        heightDisplay={this.props.heightDisplay}
        orgOid={this.props.orgOid}
        period={this.props.period}
        periodType={this.props.periodType}

        requestKPKChild={this.props.requestKPKChild}
        removeKPKChild={this.props.removeKPKChild}
      />
    );
  }
}

const mapState = (state: RootState) => ({
  kpk: selectKPK(state),
  sc: selectSC(state),
  inf: selectInf(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  heightDisplay: selectHeightDisplay(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
});

// @ts-ignore
export default connect<WidgetsStateProps, {}, {}>(mapState, {
  requestWidgets,
  requestKPKChild,
  removeKPKChild
})(WidgetsContainer);
