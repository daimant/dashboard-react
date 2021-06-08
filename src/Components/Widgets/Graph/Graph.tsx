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
  const {title, data} = sc;
  const [hiddenVal, setHiddenVal] = React.useState(false);
  const [hiddenProc, setHiddenProc] = React.useState(false);

  const hideLineClick = (event: any) => {
    if (event.dataKey === 'v1')
      setHiddenVal(!hiddenVal);
    if (event.dataKey === 'p')
      setHiddenProc(!hiddenProc);
  };

  return (
    <div className={classes.graphs}>
      <p className={classes.title}>{title}</p>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{
          top: 5,
          right: 5,
          left: heightDisplay < 700 ? -30 : heightDisplay > 700 && heightDisplay < 1000 ? 0 : 5,
          bottom: heightDisplay < 700 ? 25 : heightDisplay > 700 && heightDisplay < 1000 ? 50 : 60,
        }}>
          <XAxis dataKey="d"/>
          <YAxis style={hiddenVal ? {display: 'none'} : {}} yAxisId="left" domain={['dataMin', 'dataMax']} tickCount={5}
                 stroke='#8884d8'/>
          <YAxis style={hiddenProc ? {display: 'none'} : {}} yAxisId="right" orientation='right' tickCount={5}
                 axisLine={false} domain={['dataMin', 'dataMax']} stroke='#82ca9d'/>
          <Tooltip formatter={(value: any, name: any) => ([`${value}${name === 'p' ? " %" : " шт"}`])}/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Line style={hiddenVal ? {display: 'none'} : {}} yAxisId="left" type='monotone' dataKey='v1' stroke='#8884d8'
                strokeWidth={3}/>
          <Line style={hiddenProc ? {display: 'none'} : {}} yAxisId="right" type="monotone" dataKey='p' stroke='#82ca9d'
                strokeWidth={3}/>
          {/*<YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} minTickGap={600}/>*/}
          {/*<Line yAxisId="left" type='monotone' dataKey='v2' stroke='#82ca9d' strokeWidth={3}/>*/}
          <Legend formatter={(value) => (value === 'v1' ? 'Значение' : '%')} onClick={hideLineClick}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;
