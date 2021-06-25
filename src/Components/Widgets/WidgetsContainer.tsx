import React, {Component} from "react";
import {connect} from "react-redux";
import {
  requestKPKChild,
  removeKPKChild,
  requestWidgets,
  KPKType,
  GraphType,
  TodaysType
} from "../Redux/widgets-reducer";
import {
  /*selectInf, */ selectIsFetchingWidgets, selectKPK, selectOrgOid, selectPeriod,
  selectPeriodType, selectGraph, selectTodays
} from "../Redux/selectors";
import Widgets from "./Widgets";
import {RootStateType} from "../Redux/store";

type MapStatePropsType = {
  kpk: KPKType
  sc: GraphType[]
  isFetchingWidgets: boolean
  orgOid: string
  period: string
  periodType: string
  kpkChild: KPKType
  todays: TodaysType[]
  tops: GraphType[]
}
type MapDispatchPropsType = {
  requestWidgets: (oid: string, period: string, periodType: string) => void
  requestKPKChild: (orgOid: string, period: string, periodType: string, serviceOid: string) => void
  removeKPKChild: () => void
}
type PropsWidgetsContainerType = MapStatePropsType & MapDispatchPropsType

class WidgetsContainer extends Component<PropsWidgetsContainerType> {
  componentDidMount() {
    this.props.requestWidgets(this.props.orgOid, this.props.period, this.props.periodType);
  }

  render() {
    return (
      <Widgets
        kpk={this.props.kpk}
        sc={this.props.sc}
        todays={this.props.todays}
        tops={this.props.tops}
        /*
                inf={this.props.inf}
        */
        isFetchingWidgets={this.props.isFetchingWidgets}
        orgOid={this.props.orgOid}
        period={this.props.period}
        periodType={this.props.periodType}
        kpkChild={this.props.kpkChild}

        requestKPKChild={this.props.requestKPKChild}
        removeKPKChild={this.props.removeKPKChild}
      />
    );
  }
}
const mapState = (state: RootStateType): MapStatePropsType => ({
// @ts-ignore
  kpk: selectKPK(state),
  sc: selectGraph(state, 'sc'),
  tops: selectGraph(state, 'tops'),
  todays: selectTodays(state),
  /*
    inf: selectInf(state),
  */
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  // @ts-ignore
  kpkChild: selectKPK(state, 'child'),
});

// @ts-ignore
export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, {
  requestWidgets,
  requestKPKChild,
  removeKPKChild
})(WidgetsContainer);
