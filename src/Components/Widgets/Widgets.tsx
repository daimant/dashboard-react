import React from "react";
import "./Widgets.module.scss";
import KPKTable from "./KPKTable/KPKTable";
import Graph from "./Graph/Graph";
import InfTable from "./InfTable/InfTable";
import {WidgetsGraphElements, WidgetsPropsElements} from "../Common/Types";

const Widgets: React.FC<WidgetsPropsElements> = ({kpk, sc, inf}) => {
  // console.log('widgets', 'kpk', kpk)
  // console.log('widgets', 'sc', sc)
  // console.log('widgets', 'inf', inf)
  return (
    <main>
      <KPKTable kpk={kpk}/>
      <div>
        {sc.map((graph: WidgetsGraphElements, i: number) =>
          <Graph sc={graph} key={i}/>
        )}
      </div>
      <InfTable inf={inf}/>
    </main>
  )
};

export default Widgets;
