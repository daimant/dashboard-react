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
  selectDetailsSHK,
  selectDetailsZNO,
  selectIsFetchingWidgets,
  selectKPK,
  selectKPKChild,
  selectOrgOid,
  selectPeriod,
  selectPeriodType,
  selectSC,
  selectSCChild,
  selectServiceOid,
  selectSwitchSDAWHIT,
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
import AboutWidget from '../Common/AboutWidget/AboutWidget';
import GraphCol from './GraphCol/GraphCol';

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
  detailsSHK: GraphLineType[]
  detailsZNO: GraphLineType[]
  switchSDAWHIT: boolean
  serviceOid: string
}

type MapDispatchPropsType = {
  requestWidgets: ({orgOid, period, periodType}: RequestWidgetsType) => void
  requestServicesChild: ({orgOid, period, periodType, serviceOid}: RequestServicesChildType) => void
  removeServicesChild: () => void
  setServiceOid: (serviceOid?: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Widgets = ({
                   kpk, kpkChild, sc, scChild, todays, todaysChild, isFetchingWidgets, /*requestServicesChild,*/
                   removeServicesChild, orgOid, period, periodType, tops, requestWidgets, setServiceOid, detailsSHK,
                   detailsZNO, switchSDAWHIT, serviceOid
                 }: PropsType) => {
  useEffect(() => {
    requestWidgets({orgOid, period, periodType, numTops: [1, 2]});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchSDAWHIT]);

  if (isFetchingWidgets) return <Preloader/>;

  return (
    <div>
      <main>
        <KPKTable kpk={kpkChild.rows?.length ? kpkChild : kpk}
                  requestWidgets={requestWidgets}
                  removeServicesChild={removeServicesChild}
                  orgOid={orgOid}
                  period={period}
                  periodType={periodType}
                  setServiceOid={setServiceOid}
                  switchSDAWHIT={switchSDAWHIT}
                  serviceOid={serviceOid}/>
        <div className={classes.graphs}>
          <div className={classes.headCircularBar}>
            <h4>СЕГОДНЯ</h4>
            <AboutWidget
              description={'Отображает показатели за сегодня из таблиц справа, связан с таблицей «услуг» - при клике' +
              ' на определенную услугу, покажет значения по этой услуге в выбранном подразделении за сегодня.'}/>
          </div>
          {(todaysChild.length ? todaysChild : todays).map((el: TodaysType, i) =>
            <CircularBar today={el.v1}
                         diff={el.p}
                         key={`${el.title}${el.v1}${i}${todaysChild.length ? 'child' : ''}`}
                         err={el.err}
                         title={el.title}/>
          )}
        </div>
        <div className={classes.graphs}>
          {(scChild.length ? scChild : sc).map((graphLineData: GraphLineType, i) =>
            <GraphLine graphLineData={graphLineData}
                       key={`${graphLineData.title}${graphLineData.id}${i}${scChild.length ? 'child' : ''}`}/>
          )}
        </div>
      </main>
      <div className={classes.secondMain}>
        {detailsZNO.map((graphData: GraphLineType, i) => {
            if (i === 0) {
              return <GraphCol graphColData={graphData}
                               key={`${graphData.title}${graphData.id}${i}`}
                               extendedStyle={{height: '100%'}}/>
            } else return <GraphLine graphLineData={graphData}
                                     key={`${graphData.title}${graphData.id}${i}`}
                                     extendedStyle={{height: '100%'}}/>
          }
        )}
      </div>
      <div className={classes.secondMain}>
        {detailsSHK.map((graphLineData: GraphLineType, i) =>
          <GraphLine graphLineData={graphLineData}
                     key={`${graphLineData.title}${graphLineData.id}${i}`}
                     extendedStyle={{height: '100%'}}/>
        )}
      </div>
      <div className={classes.secondMain}>
        {tops.map((graphAreaData: GraphAreaType) =>
          <GraphArea graphAreaData={graphAreaData}
                     key={graphAreaData.title}
                     extendedStyle={{height: '100%'}}/>
        )}
      </div>
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
  detailsSHK: selectDetailsSHK(state),
  detailsZNO: selectDetailsZNO(state),
  switchSDAWHIT: selectSwitchSDAWHIT(state),
  serviceOid: selectServiceOid(state),
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
