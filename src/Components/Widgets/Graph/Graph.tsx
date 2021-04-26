import React from "react";
import classes from "./Graph.module.scss";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';



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
    result.push({d: obj.x[i], v: obj.y[i]})
  }
  return result;
};

const Graph: React.FC<Props> = (props) => {

  const parsedGraphData: object[] = GraphSelector(props.data);
  console.log(parsedGraphData)
  return (
      <div className={classes.graphs}>
        {/*<p>{props.data.title}</p>*/}
        <ResponsiveContainer >
          <AreaChart
            width={500}
            height={400}
            data={parsedGraphData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="d"/>
            <YAxis domain={[Math.min(...props.data.y) - 1, Math.max(...props.data.y) + 1]}/>
            <Area dataKey="v" stroke="#8884d8" fill="#8884d8" />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  )
};

export default Graph;
