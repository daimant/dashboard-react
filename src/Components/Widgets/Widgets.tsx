import React from "react";
import classes from "./Widgets.module.scss";
import KPKTable from "./KPKTable/KPKTable";
import Graph from "./Graph/Graph";
import InfTable from "./InfTable/InfTable";
import {WidgetsGraphElements, WidgetsPropsElements} from "../Common/Types";
import {Preloader} from "../Common/Preloader";

const Widgets: React.FC<WidgetsPropsElements> = ({kpk, sc, inf, isFetchingWidgets, widgetsTitle, heightDisplay}) => {
  if (isFetchingWidgets) return <Preloader/>;

  return (
    <main>
      <KPKTable kpk={kpk} widgetsTitle={widgetsTitle}/>
      <div className={classes.graphs}>
        {sc.map((graph: WidgetsGraphElements, i: number) =>
          <Graph sc={graph} key={i} heightDisplay={heightDisplay} widgetsTitle={widgetsTitle}/>
        )}
      </div>
      <InfTable inf={inf} widgetsTitle={widgetsTitle}/>
    </main>
  )
};

export default Widgets;
