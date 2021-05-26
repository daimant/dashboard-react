import React from "react";
import classes from "./Graph.module.scss";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {GraphProps} from "../../Common/Types";

const Graph: React.FC<GraphProps> = ({sc, heightDisplay}) => {
  const {title, data, max, min} = sc;

  return (
    <div className={classes.graphs}>
      <p className={classes.title}>{title}</p>
      <ResponsiveContainer>
        <AreaChart
          // width={600}
          // height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: heightDisplay < 900 ? -20 : -15,
            bottom: heightDisplay < 900 ? 25 : 45,
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
