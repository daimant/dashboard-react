import React from "react";
import classes from "./Graph.module.scss";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {GraphProps} from "../../Common/Types";
import WidgetsTitle from "../WidgetsTitle/WidgetsTitle";

const Graph: React.FC<GraphProps> = ({sc, heightDisplay, widgetsTitle}) => {
  const {title, data, max, min} = sc;

  return (
    <div className={classes.graphs}>
      <div className={classes.title}>
        <p className={classes.titleGraph}>{title}</p>
        <WidgetsTitle widgetsTitle={widgetsTitle}/>
      </div>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: heightDisplay < 900 ? -20 : -15,
            bottom: heightDisplay < 900 ? 40 : 65,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="d"/>
          <YAxis domain={[min - 1, max + 1]}/>
          <Area dataKey="v" stroke="#8884d8" fill="#8884d8"/>
          <Tooltip/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;
