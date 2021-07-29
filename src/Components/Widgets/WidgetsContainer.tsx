import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {requestServicesChild, removeServicesChild, requestWidgets} from '../../Redux/widgets-reducer';
import {
  /*selectInf, */ selectIsFetchingWidgets, selectKPK, selectOrgOid, selectPeriod, selectPeriodType, selectTodays,
  selectKPKChild, selectTops, selectSC, selectSCChild, selectTodaysChild
} from '../../Redux/selectors';
import Widgets from './Widgets';
import {RootStateType} from '../../Redux/store';
import {KPKType, GraphLineType, TodaysType, GraphAreaType} from '../../Types/Types';

type MapStatePropsType = {
  kpk: KPKType
  kpkChild: KPKType
  sc: Array<GraphLineType>
  scChild: Array<GraphLineType>
  todays: Array<TodaysType>
  todaysChild: Array<TodaysType>
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

const WidgetsContainer = ({
                            kpk, kpkChild, sc, scChild, todays, todaysChild, tops, isFetchingWidgets, orgOid, period,
                            periodType, requestWidgets, requestServicesChild, removeServicesChild
                          }: PropsType) => {

  useEffect(() => {
    requestWidgets(orgOid, period, periodType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Widgets
      kpk={kpk}
      kpkChild={kpkChild}
      sc={sc}
      scChild={scChild}
      todays={todays}
      todaysChild={todaysChild}
      tops={tops}
      isFetchingWidgets={isFetchingWidgets}
      orgOid={orgOid}
      period={period}
      periodType={periodType}
      /*
              inf={inf}
      */

      requestServicesChild={requestServicesChild}
      removeServicesChild={removeServicesChild}
    />
  )
};

const mapState = (state: RootStateType): MapStatePropsType => ({
  kpk: selectKPK(state),
  kpkChild: selectKPKChild(state),
  sc: selectSC(state),
  scChild: selectSCChild(state),
  todays: selectTodays(state),
  todaysChild: selectTodaysChild(state),
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
