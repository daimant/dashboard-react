import React from "react";
import classes from "./Graph.module.scss";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
} from 'recharts';
import {GraphProps} from "../../Common/Types";

const Graph: React.FC<GraphProps> = ({sc, heightDisplay}) => {
  const {title, data, max, min} = sc;
  const [checked, setChecked] = React.useState(false);

  const switchOfLineValue = () => {
  };
  const switchOfLineProc = () => {
  };
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  const renderLegend = (props: any) => {
    const {payload} = props;

    return (
      <ul>
        {
          payload.map((entry: any, index: any) => (
            <li key={`item-${index}`}>{entry.value}</li>
          ))
        }
      </ul>
    );
  }

  return (
    <div className={classes.graphs}>
      <p className={classes.title}>{title}</p>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{
          top: 5,
          right: 30,
          left: heightDisplay < 700 ? -30 : heightDisplay > 700 && heightDisplay < 1000 ? -20 : 5,
          bottom: heightDisplay < 700 ? 20 : heightDisplay > 700 && heightDisplay < 1000 ? 45 : 55,
        }}>
          <XAxis dataKey="d"/>
          <YAxis yAxisId="left" domain={[min - 1, max + 1]} tickCount={10} stroke='#8884d8'/>
          {/*<YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} minTickGap={600}/>*/}
          <YAxis yAxisId="right" orientation='right' tickCount={10} tickLine={false} axisLine={false} domain={[0, 100]}
                 stroke='#82ca9d'/>
          <Tooltip formatter={(value: any, name: any) => ([`${value}${name === 'p' ? "%" : "шт"}`])}/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Line yAxisId="left" type='monotone' dataKey='v1' stroke='#8884d8' strokeWidth={3}
                onClick={switchOfLineValue}/>
          {/*<Line yAxisId="left" type='monotone' dataKey='v2' stroke='#82ca9d' strokeWidth={3}/>*/}
          <Line yAxisId="right" type="monotone" dataKey='p' stroke='#82ca9d' strokeWidth={3}
                onClick={switchOfLineProc}/>
          <Legend formatter={(value) => (value === 'v1' ? 'Значение' : '%')}/>
        </ComposedChart>

        {/*>*/}
        {/*  <XAxis dataKey="d"/>*/}
        {/*  <YAxis domain={[min - 1, max + 1]}/>*/}
        {/*  <Tooltip />*/}
        {/*  <Legend />*/}
        {/*  <Line type="monotone" dataKey="v1" stroke="#8884d8" />*/}
        {/*  <Line type="monotone" dataKey="v2" stroke="#82ca9d" />*/}
        {/*  <Tooltip/>*/}
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;
