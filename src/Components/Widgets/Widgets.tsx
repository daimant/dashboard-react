import React, {useEffect} from 'react';
import classes from './Widgets.module.scss';
import KPKTable from './KPKTable/KPKTable';
import GraphLine from './GraphLine/GraphLine';
import {Preloader} from '../Common/Preloader/Preloader';
import CircularBar from './CircularBar/CircularBar';
import {
  GraphAreaType,
  GraphLineType,
  KPKType,
  TodaysType
} from '../../Types/Types';
import GraphArea from './GraphArea/GraphArea';
import {RootStateType} from "../../Redux/store";
import {
  selectIsFetchingWidgets,
  selectIsOrgRZD,
  selectKPK,
  selectKPKChild,
  selectOrgOid,
  selectPeriod,
  selectPeriodType,
  selectSC,
  selectSCChild,
  selectTodays,
  selectTodaysChild,
  selectTops
} from "../../Redux/selectors";
import {connect} from "react-redux";
import {
  removeServicesChild,
  requestServicesChild,
  requestWidgets
} from "../../Redux/widgets";

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
  isOrgRZD: boolean
}

type MapDispatchPropsType = {
  requestWidgets: (oid: string, period: string, periodType: string, isOrgRZD: boolean) => void
  requestServicesChild: (orgOid: string, period: string, periodType: string, serviceOid: number, isOrgRZD: boolean) => void
  removeServicesChild: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Widgets = ({
                   kpk, kpkChild, sc, scChild, todays, todaysChild, isFetchingWidgets, requestServicesChild,
                   removeServicesChild, orgOid, period, periodType, tops, isOrgRZD, requestWidgets
                 }: PropsType) => {

  useEffect(() => {
    requestWidgets(orgOid, period, periodType, isOrgRZD);
  }, []);

  if (isFetchingWidgets) return <Preloader/>;

  return (
    <div>
      <main>
        <KPKTable kpk={kpkChild.rows?.length ? kpkChild : kpk}
                  requestServicesChild={requestServicesChild}
                  removeServicesChild={removeServicesChild}
                  orgOid={orgOid}
                  period={period}
                  periodType={periodType}
                  isOrgRZD={isOrgRZD}/>
        <div className={classes.graphs}>
          <h4 className={classes.headCircularBar}>СЕГОДНЯ</h4>
          {(todaysChild.length ? todaysChild : todays).map((el: TodaysType) =>
            <CircularBar today={el.v1} diff={el.p} key={`${el.title}${el.v1}`} err={el.err}/>
          )}
        </div>
        <div className={classes.graphs}>
          {(scChild.length ? scChild : sc).map((graphLineData: GraphLineType) =>
            <GraphLine graphLineData={graphLineData} key={`${graphLineData.title}${graphLineData.id}`}/>
          )}
        </div>
      </main>
      <div className={`${classes.secondMain}`}>
        {tops.map((graphAreaData: GraphAreaType) =>
          <GraphArea graphAreaData={graphAreaData} key={graphAreaData.title} extendedStyle={{height: '100%'}}/>
        )}
      </div>
      {/*      <div className={`${classes.secondMain}`}>
        <GraphArea graphAreaData={tops[0]} extendedStyle={{height: '100%'}}/>
        <GraphArea graphAreaData={tops[1]} extendedStyle={{height: '100%'}}/>
      </div>*/}
    </div>
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
  isOrgRZD: selectIsOrgRZD(state),
  /*
    inf: selectInf(state),
  */
});

const mapDispatch = {
  removeServicesChild,
  requestServicesChild,
  requestWidgets
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Widgets);
