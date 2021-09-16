import React from 'react';
import {AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area} from 'recharts';
import {GraphAreaType} from '../../../Types/Types';
import classes from './GraphArea.module.scss';
import AboutWidget from '../../Common/AboutWidget/AboutWidget';

type PropsType = {
  graphAreaData: GraphAreaType
  extendedStyle?: object
}

const dictDescriptionAbout: { [key: string]: string } = {
  'Назначение заявок': 'Отображает динамику назначения заявок, без привязки к фильтрам.',
  'Установка ПО': 'Отображает динамику по заявкам на «установку ПО», без привязки к фильтрам.',
};

const GraphArea = ({graphAreaData, extendedStyle = {}}: PropsType) => {
  const {title, data, percents} = graphAreaData;

  return (
    <div className={classes.graphs} style={extendedStyle}>
      <div className={classes.headGraph}>
        &nbsp;
        <h3>{!data?.length && title !== 'Ошибка при загрузке' ? `${title} - Нет данных` : title}</h3>
        <AboutWidget description={dictDescriptionAbout[title]}/>
      </div>
      <ResponsiveContainer>
        <AreaChart data={data}
                   margin={{top: 10, bottom: 30, right: 50}}
                   style={!data.length ? {display: 'none'} : {}}>
          <XAxis dataKey='d'
                 axisLine={false}
                 tickFormatter={tick => {if (tick) return tick.slice(0, 5)}}/>
          <YAxis tickFormatter={tick => `${tick * 100}`}
                 axisLine={false}
                 tickCount={2}/>
          <Tooltip labelFormatter={(label: string) => `Дата: ${label}`}
                   formatter={(value: number[], name: 'p1' | 'p2' | 'p3') => ([`${percents[name]}: ${Math.trunc(value[2] * 100)} %`])}/>
          <Area dataKey='p1'
                fillOpacity={1}
                stroke='#2D6AA3'
                fill='#2D6AA3'/>
          <Area dataKey='p2'
                fillOpacity={1}
                stroke='#8CC06D'
                fill='#8CC06D'/>
          <Area dataKey='p3'
                fillOpacity={1}
                stroke='#e21a1a'
                fill='#e21a1a'/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphArea;
