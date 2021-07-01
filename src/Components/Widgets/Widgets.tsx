import React, {FC} from 'react';
import classes from './Widgets.module.scss';
import KPKTable from './KPKTable/KPKTable';
import Graph from './Graph/Graph';
import {Preloader} from '../Common/Preloader/Preloader';
import CircularBar from './CircularBar/CircularBar';
import {GraphType, KPKType, TodaysType} from '../Common/Types';

type PropsType = {
  kpk: KPKType
  kpkChild: KPKType
  sc: Array<GraphType>
  tops: Array<GraphType>
  todays: Array<TodaysType>
  isFetchingWidgets: boolean
  orgOid: string
  period: string
  periodType: string

  requestKPKChild: (orgOid: string, period: string, periodType: string, serviceOid: number) => void
  removeKPKChild: () => void
}

const Widgets: FC<PropsType> = ({
                                  kpk, sc, isFetchingWidgets, requestKPKChild, removeKPKChild, orgOid, period,
                                  periodType, kpkChild, todays, tops
                                }) => {
  if (isFetchingWidgets) return <Preloader/>;

  return (
    <div>
      <main>
        <KPKTable kpk={kpkChild.rows?.length ? kpkChild : kpk} requestKPKChild={requestKPKChild}
                  removeKPKChild={removeKPKChild} orgOid={orgOid} period={period} periodType={periodType}/>
        <div className={classes.graphs}>
          <h4 className={classes.headCircularBar}>СЕГОДНЯ</h4>
          {todays.map((el: TodaysType, i: number) =>
            <CircularBar today={el.v1} diff={el.p} key={i} err={el.err}/>
          )}
        </div>
        <div className={classes.graphs}>
          {sc.map((graph: GraphType, i: number) =>
            <Graph graph={graph} key={i}/>
          )}
        </div>
      </main>
      <div className={`${classes.secondMain}`}>
        {tops.map((graph: GraphType, i: number) =>
          <Graph graph={graph} key={i} extendedStyle={{height: '100%'}}/>
        )}
      </div>
      <div className={`${classes.secondMain}`}>
        {tops.map((graph: GraphType, i: number) =>
          <Graph graph={graph} key={i} extendedStyle={{height: '100%'}}/>
        )}
      </div>
    </div>
  )
};

export default Widgets;
