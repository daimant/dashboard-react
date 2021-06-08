import React from "react";
import classes from "./Widgets.module.scss";
import KPKTable from "./KPKTable/KPKTable";
import Graph from "./Graph/Graph";
// import InfTable from "./InfTable/InfTable";
import {WidgetsGraphElements, /*WidgetsPropsElements*/} from "../Common/Types";
import {Preloader} from "../Common/Preloader/Preloader";
import CircularBar from "./CircularBar/CircularBar";

const Widgets: React.FC<any> = props => {
  const {
    kpk, sc /*inf*/, isFetchingWidgets, heightDisplay, requestKPKChild, removeKPKChild, orgOid, period, periodType,
    kpkChild, todays
  } = props;

  if (isFetchingWidgets) return <Preloader/>;

  return (
    <main>
      <KPKTable kpk={kpkChild.data ? kpkChild : kpk} requestKPKChild={requestKPKChild} removeKPKChild={removeKPKChild}
                orgOid={orgOid} period={period} periodType={periodType} cols={kpkChild.data ? kpkChild.cols : kpk.cols}
                rows={kpkChild.data ? kpkChild.data : kpk.data}/>
      <div className={classes.graphs}>
        {todays.map((el: { title: string, v1: number, p: number }, i: number) =>
          <CircularBar title={el.title} today={el.v1} diff={el.p} key={i}/>
        )}
      </div>
      <div className={classes.graphs}>
        {sc.map((graph: WidgetsGraphElements, i: number) =>
          <Graph sc={graph} key={i} heightDisplay={heightDisplay}/>
        )}
      </div>
      {/*<InfTable inf={inf} widgetsTitle={widgetsTitle}/>*/}
    </main>
  )
};

export default Widgets;
