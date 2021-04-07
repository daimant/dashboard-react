import React from "react";
import "./Widgets.module.scss";
import TableLeft from "./TableLeft/TableLeft";
import Graph from "./Graph/Graph";
import TableRight from "./TableRight/TableRight";

interface Props {
}

const Widgets: React.FC<Props> = props => {
  return (
    <main>
      <TableLeft/>
      <div>
        <Graph/>
        <Graph/>
        <Graph/>
      </div>
      <TableRight/>
    </main>
  )
};

export default Widgets;
