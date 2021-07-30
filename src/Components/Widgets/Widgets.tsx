import React from 'react';
import classes from './Widgets.module.scss';
import KPKTable from './KPKTable/KPKTable';
import GraphLine from './GraphLine/GraphLine';
import {Preloader} from '../Common/Preloader/Preloader';
import CircularBar from './CircularBar/CircularBar';
import {GraphAreaType, GraphLineType, KPKType, TodaysType} from '../../Types/Types';
import GraphArea from './GraphArea/GraphArea';

type PropsType = {
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

  requestServicesChild: (orgOid: string, period: string, periodType: string, serviceOid: number) => void
  removeServicesChild: () => void
}

const Widgets = ({
                   kpk, kpkChild, sc, scChild, todays, todaysChild, isFetchingWidgets, requestServicesChild,
                   removeServicesChild, orgOid, period, periodType, tops
                 }: PropsType) => {
  if (isFetchingWidgets) return <Preloader/>;

  return (
    <div>
      <main>
        <KPKTable kpk={kpkChild.rows?.length ? kpkChild : kpk} requestServicesChild={requestServicesChild}
                  removeServicesChild={removeServicesChild} orgOid={orgOid} period={period} periodType={periodType}/>
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

export default Widgets;
