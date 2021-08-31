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
import {RootStateType} from '../../Redux/store';
import {
  selectIsFetchingWidgets,
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
} from '../../Redux/selectors';
import {connect} from 'react-redux';
import {
  removeServicesChild,
  requestServicesChild,
  requestWidgets
} from '../../Redux/widgets';
import {setServiceOid} from '../../Redux/filters/actions';
import {RequestServicesChildType, RequestWidgetsType} from '../../Types/Types';

type MapStatePropsType = {
  kpk: KPKType
  kpkChild: KPKType
  sc: GraphLineType[]
  scChild: GraphLineType[]
  todays: TodaysType[]
  todaysChild: TodaysType[]
  tops: GraphAreaType[]
  isFetchingWidgets: boolean
  orgOid: string
  period: string
  periodType: string
}

type MapDispatchPropsType = {
  requestWidgets: ({orgOid, period, periodType}: RequestWidgetsType) => void
  requestServicesChild: ({orgOid, period, periodType, serviceOid}: RequestServicesChildType) => void
  removeServicesChild: () => void
  setServiceOid: (serviceOid?: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Widgets = ({
                   kpk, kpkChild, sc, scChild, todays, todaysChild, isFetchingWidgets, requestServicesChild,
                   removeServicesChild, orgOid, period, periodType, tops, requestWidgets, setServiceOid
                 }: PropsType) => {

  useEffect(() => {
    requestWidgets({orgOid, period, periodType});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  setServiceOid={setServiceOid}/>
        <div className={classes.graphs}>
          <h4 className={classes.headCircularBar}>СЕГОДНЯ</h4>
          {(todaysChild.length ? todaysChild : todays).map((el: TodaysType) =>
            <CircularBar today={el.v1}
                         diff={el.p}
                         key={`${el.title}${el.v1}`}
                         err={el.err}/>
          )}
        </div>
        <div className={classes.graphs}>
          {(scChild.length ? scChild : sc).map((graphLineData: GraphLineType) =>
            <GraphLine graphLineData={graphLineData}
                       key={`${graphLineData.title}${graphLineData.id}`}/>
          )}
        </div>
      </main>
      <div className={classes.secondMain}>
        {tops.map((graphAreaData: GraphAreaType) =>
          <GraphArea graphAreaData={graphAreaData}
                     key={graphAreaData.title}
                     extendedStyle={{height: '100%'}}/>
        )}
      </div>
      {/*      <div className={classes.secondMain}>
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
  /*
    inf: selectInf(state),
  */
});

const mapDispatch = {
  removeServicesChild,
  requestServicesChild,
  requestWidgets,
  setServiceOid,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Widgets);
