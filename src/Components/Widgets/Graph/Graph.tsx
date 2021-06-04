import React from "react";
import classes from "./Graph.module.scss";
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line} from 'recharts';
import {GraphProps} from "../../Common/Types";
import WidgetsTitle from "../WidgetsTitle/WidgetsTitle";

const Graph: React.FC<GraphProps> = ({sc, heightDisplay}) => {
  const {title, data, max, min} = sc;
console.log(data)
  return (
    <div className={classes.graphs}>
      <p className={classes.title}>{title}</p>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: heightDisplay < 700 ? -30 : heightDisplay > 700 && heightDisplay < 1000 ? -20 : -15,
            bottom: heightDisplay < 700 ? 20 : heightDisplay > 700 && heightDisplay < 1000 ? 45 : 55,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="d"/>
          <YAxis domain={[min - 1, max + 1]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="v1" stroke="#8884d8" />
          <Line type="monotone" dataKey="v2" stroke="#82ca9d" />
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;
