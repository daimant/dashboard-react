import React from "react";
import classes from "./Graph.module.scss";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {GraphProps} from "../../Common/Types";

const Graph: React.FC<GraphProps> = ({sc}) => {
  const {title, data, max, min} = sc;
  // const parsedGraphData: object[] = GraphSelector(graphData);
  // console.log(sc)
  return (
      <div className={classes.graphs}>
        {/*<p>{props.data.title}</p>*/}
        <ResponsiveContainer >
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="d"/>
            <YAxis domain={[min - 1, max + 1]}/>
            <Area dataKey="v" stroke="#8884d8" fill="#8884d8" />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  )
};

export default Graph;
