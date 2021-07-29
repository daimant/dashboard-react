import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestServicesChild, removeServicesChild, requestWidgets} from '../Redux/widgets-reducer';
import {
  /*selectInf, */ selectIsFetchingWidgets, selectKPK, selectOrgOid, selectPeriod, selectPeriodType, selectTodays,
  selectKPKChild, selectTops, selectSC, selectSCChild
} from '../Redux/selectors';
import Widgets from './Widgets';
import {RootStateType} from '../Redux/store';
import {KPKType, GraphLineType, TodaysType, GraphAreaType} from '../Common/Types';

type MapStatePropsType = {
  kpk: KPKType
  kpkChild: KPKType
  sc: Array<GraphLineType>
  scChild: Array<GraphLineType>
  todays: Array<TodaysType>
  tops: Array<GraphAreaType>
  isFetchingWidgets: boolean
  orgOid: string
  period: string
  periodType: string
}
type MapDispatchPropsType = {
  requestWidgets: (oid: string, period: string, periodType: string) => void
  requestServicesChild: (orgOid: string, period: string, periodType: string, serviceOid: number) => void
  removeServicesChild: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class WidgetsContainer extends Component<PropsType> {
  componentDidMount() {
    this.props.requestWidgets(this.props.orgOid, this.props.period, this.props.periodType);
  }

  render() {
    return (
      <Widgets
        kpk={this.props.kpk}
        kpkChild={this.props.kpkChild}
        sc={this.props.sc}
        scChild={this.props.scChild}
        todays={this.props.todays}
        tops={this.props.tops}
        isFetchingWidgets={this.props.isFetchingWidgets}
        orgOid={this.props.orgOid}
        period={this.props.period}
        periodType={this.props.periodType}
        /*
                inf={this.props.inf}
        */

        requestServicesChild={this.props.requestServicesChild}
        removeServicesChild={this.props.removeServicesChild}
      />
    );
  }
}

const mapState = (state: RootStateType): MapStatePropsType => ({
  kpk: selectKPK(state),
  kpkChild: selectKPKChild(state),
  sc: selectSC(state),
  scChild: selectSCChild(state),
  todays: selectTodays(state),
  tops: selectTops(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  /*
    inf: selectInf(state),
  */
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, {
  requestWidgets,
  requestServicesChild,
  removeServicesChild
})(WidgetsContainer);
