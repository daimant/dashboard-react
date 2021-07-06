import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestKPKChild, removeKPKChild, requestWidgets} from '../Redux/widgets-reducer';
import {
  /*selectInf, */ selectIsFetchingWidgets, selectKPK, selectOrgOid, selectPeriod, selectPeriodType, selectTodays,
  selectKPKChild, selectTops, selectSC
} from '../Redux/selectors';
import Widgets from './Widgets';
import {RootStateType} from '../Redux/store';
import {KPKType, GraphLineType, TodaysType, GraphAreaType} from '../Common/Types';

type MapStatePropsType = {
  kpk: KPKType
  kpkChild: KPKType
  sc: Array<GraphLineType>
  tops: Array<GraphAreaType>
  todays: Array<TodaysType>
  isFetchingWidgets: boolean
  orgOid: string
  period: string
  periodType: string
}
type MapDispatchPropsType = {
  requestWidgets: (oid: string, period: string, periodType: string) => void
  requestKPKChild: (orgOid: string, period: string, periodType: string, serviceOid: number) => void
  removeKPKChild: () => void
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
  kpk: selectKPK(state),
  kpkChild: selectKPKChild(state),
  sc: selectSC(state),
  tops: selectTops(state),
  todays: selectTodays(state),
  /*
    inf: selectInf(state),
  */
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, {
  requestWidgets,
  requestKPKChild,
  removeKPKChild
})(WidgetsContainer);
