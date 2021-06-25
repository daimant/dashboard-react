import React, {FC} from "react";
import classes from "./Widgets.module.scss";
import KPKTable from "./KPKTable/KPKTable";
import Graph from "./Graph/Graph";
import {Preloader} from "../Common/Preloader/Preloader";
import CircularBar from "./CircularBar/CircularBar";

export type GraphsType = {
  id?: number
  title: string
  max: number
  min: number
  data: GraphElementsType[]
}
export type GraphElementsType = {
  d: string
  v: number
}

const Widgets: React.FC<any> = props => {
  const {
    kpk, sc, isFetchingWidgets, requestKPKChild, removeKPKChild, orgOid, period, periodType,
    kpkChild, todays, tops
  } = props;

  if (isFetchingWidgets) return <Preloader/>;

  return (
    <div>
      <main>
        <KPKTable kpk={kpkChild.data ? kpkChild : kpk} requestKPKChild={requestKPKChild} removeKPKChild={removeKPKChild}
                  orgOid={orgOid} period={period} periodType={periodType}/>
        <div className={classes.graphs}>
          <h4 className={classes.headCircularBar}>СЕГОДНЯ</h4>
          {todays.map((el: TodaysType, i: number) =>
            <CircularBar title={el.title} today={el.v1} diff={el.p} key={i} err={el.err}/>
          )}
        </div>
        <div className={classes.graphs}>
          {sc.map((graph: GraphsType, i: number) =>
            <Graph sc={graph} key={i}/>
          )}
        </div>
      </main>
      <div className={`${classes.secondMain}`}>
        {tops.map((graph: GraphsType, i: number) =>
          <Graph sc={graph} key={i} extendedStyle={{height: '100%'}}/>
        )}
      </div>
    </div>
  )
};

export default Widgets;
