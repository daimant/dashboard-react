import React, {FC} from 'react';
import {AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area} from 'recharts';
import {GraphAreaType} from "../../Common/Types";
import classes from "../GraphLine/GraphLine.module.scss";

type PropsType = {
  graphAreaData: GraphAreaType
  extendedStyle?: object
}

const GraphArea: FC<PropsType> = ({graphAreaData, extendedStyle = {}}) => {
  const {title, data, percents} = graphAreaData;

  return (
    <div className={classes.graphs} style={extendedStyle}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{top: -10, right: 30}}>
          <XAxis dataKey="d"/>
          <YAxis tickFormatter={tick => `${tick * 100}`} tickCount={2}/>
          <Tooltip labelFormatter={(label: string) => `Дата: ${label}`}
                   // @ts-ignore
                   formatter={(value: Array<number>, name: string) => ([`${percents[name]}: ${value[2] * 100} %`])}/>
          <Area dataKey="p1" stroke="#8884d8" fill="#8884d8"/>
          <Area dataKey="p3" stroke="#FF0000" fill="#FF0000"/>
          <Area dataKey="p2" stroke="#82ca9d" fill="#82ca9d"/>
          <Legend iconSize={0}
                  verticalAlign='top'
                  formatter={(line) => (<div className={classes.headGraph}>
                      <h3 className={line === 'p1' ? classes.titleName : classes.hiddenTitleName}>{title}&emsp;</h3>
                    </div>
                  )}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphArea;
