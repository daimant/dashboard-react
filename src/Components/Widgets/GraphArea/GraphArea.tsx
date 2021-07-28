import React, {FC} from 'react';
import {AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area} from 'recharts';
import {GraphAreaType} from "../../Common/Types";
import classes from "./GraphArea.module.scss";

type PropsType = {
  graphAreaData: GraphAreaType
  extendedStyle?: object
}

const GraphArea: FC<PropsType> = ({graphAreaData, extendedStyle = {}}) => {
  const {title, data, percents} = graphAreaData;

  return (
    <div className={classes.graphs} style={extendedStyle}>
      <div className={classes.headGraph}>
      <h3 className={classes.title}>{title}</h3>
      </div>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{top: 10, bottom: 30, right: 50}}>
          <XAxis dataKey="d" axisLine={false}/>
          <YAxis tickFormatter={tick => `${tick * 100}`} axisLine={false} tickCount={2}/>
          <Tooltip labelFormatter={(label: string) => `Дата: ${label}`}
                   // @ts-ignore
                   formatter={(value: Array<number>, name: string) => ([`${percents[name]}: ${Math.trunc(value[2] * 100)} %`])}/>
          <Area dataKey="p1" stroke="#8884d8" fill="#8884d8"/>
          <Area dataKey="p3" stroke="#82ca9d" fill="#82ca9d"/>
          <Area dataKey="p2" stroke="#FF0000" fill="#FF0000"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphArea;
