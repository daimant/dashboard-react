import React from "react";
import classes from "./Graph.module.scss";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {GraphProps} from "../../Common/Types";
import WidgetsTitle from "../WidgetsTitle/WidgetsTitle";

const Graph: React.FC<GraphProps> = ({sc, heightDisplay}) => {
  const {title, data, max, min} = sc;

  return (
    <div className={classes.graphs}>
      <p className={classes.title}>{title}</p>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: heightDisplay < 700 ? -30 : heightDisplay > 700 && heightDisplay < 1000 ? -20 : -15,
            bottom: heightDisplay < 700 ? 20 : heightDisplay > 700 && heightDisplay < 1000 ? 30 : 55,
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
