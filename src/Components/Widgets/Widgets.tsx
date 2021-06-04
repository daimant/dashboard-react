import React from "react";
import classes from "./Widgets.module.scss";
import KPKTable from "./KPKTable/KPKTable";
import Graph from "./Graph/Graph";
// import InfTable from "./InfTable/InfTable";
import {WidgetsGraphElements, /*WidgetsPropsElements*/} from "../Common/Types";
import {Preloader} from "../Common/Preloader/Preloader";
import CircularBar from "./CircularBar/CircularBar";

const Widgets: React.FC<any> = props => {
  const {kpk, sc /*inf*/, isFetchingWidgets, heightDisplay, requestKPKChild, removeKPKChild, orgOid, period, periodType} = props;

  if (isFetchingWidgets) return <Preloader/>;

  return (
    <main>
      <KPKTable kpk={kpk} requestKPKChild={requestKPKChild} removeKPKChild={removeKPKChild} orgOid={orgOid} period={period} periodType={periodType}/>
      <div className={classes.graphs}>
        {[['97%', '+5'], ['23%', '-50'], ['90%', '+0.5']].map((el, i) =>
          <CircularBar today={el[0]} diff={el[1]} key={i}/>
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
