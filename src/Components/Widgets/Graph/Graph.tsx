import React from "react";
import classes from "./Graph.module.scss";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface Props {
  data: PropsGraphData
}
interface PropsGraphData {
  title?: string,
  x: string[],
  y: number[],
}

const GraphSelector = (obj: PropsGraphData) => {
  const result = [];

  for (let i = 0; i < obj.x.length; i++) {
    result.push({name: obj.x[i], uv: obj.y[i]})
  }
  return result;
}

const Graph: React.FC<Props> = (props) => {
  const parsedGraphData:object[] = GraphSelector(props.data);

  return (
    <div className={classes.widgets}>
      <ResponsiveContainer className={classes.widget_graph}>
        <AreaChart
          width={500}
          height={400}
          data={parsedGraphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis domain={[Math.min(...props.data.y) - 1, Math.max(...props.data.y) + 1]}/>
          <Area dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;
