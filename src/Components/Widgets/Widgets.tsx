import React from "react";
import "./Widgets.module.scss";
import KPKTable from "./KPKTable/KPKTable";
import Graph from "./Graph/Graph";
import InfTable from "./InfTable/InfTable";
import {WidgetsGraphElements, WidgetsPropsElements} from "../Common/Types";
import {Preloader} from "../Common/Preloader";

const Widgets: React.FC<WidgetsPropsElements> = ({kpk, sc, inf, isFetchingWidgets, kpkTitle, heightDisplay}) => {
  if (isFetchingWidgets) return <Preloader/>;

  return (
    <main>
      <KPKTable kpk={kpk} title={kpkTitle}/>
      <div>
        {sc.map((graph: WidgetsGraphElements, i: number) =>
          <Graph sc={graph} key={i} heightDisplay={heightDisplay}/>
        )}
      </div>
      <InfTable inf={inf}/>
    </main>
  )
};

export default Widgets;
