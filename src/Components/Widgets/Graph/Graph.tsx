import React from "react";
import classes from "./Graph.module.scss";
import {ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line} from 'recharts';
import {GraphProps} from "../../Common/Types";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const CheckedValueGraph: React.FC<any> = ({description, hidden, hideLineClick, line}) => {
  return (
    <h3 className={classes.checkBoxGroup} onClick={() => hideLineClick(line)}>{description} {!hidden
      ? <CheckBoxIcon className={classes.iconCheckBox} color='action' fontSize='small'/>
      : <CheckBoxOutlineBlankIcon className={classes.iconCheckBox} color='action' fontSize='small'/>}
    </h3>
  )
};

const Graph: React.FC<GraphProps> = ({sc, heightDisplay}) => {
  const {title, data} = sc;
  const [hiddenVal, setHiddenVal] = React.useState(false);
  const [hiddenProc, setHiddenProc] = React.useState(false);

  const hideLineClick = (line: string) => {
    if (line === 'v1')
      setHiddenVal(!hiddenVal);
    if (line === 'p')
      setHiddenProc(!hiddenProc);
  };

  return (
    <div className={classes.graphs}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{
          top: -10, // 5 was
          right: 5,
          left: heightDisplay < 700 ? -30 : heightDisplay > 700 && heightDisplay < 1000 ? 0 : 5,
          bottom: heightDisplay < 700 ? -20 : heightDisplay > 700 && heightDisplay < 1000 ? 5 : 15, //25 50 60 was
        }}>
          <XAxis dataKey="d"/>
          <YAxis style={hiddenVal ? {display: 'none'} : {}}
                 yAxisId="left"
                 domain={['dataMin', 'dataMax']}
                 tickCount={5}
                 stroke='#8884d8'/>
          <YAxis style={hiddenProc ? {display: 'none'} : {}}
                 yAxisId="right"
                 orientation='right'
                 tickCount={5}
                 axisLine={false}
                 domain={['dataMin', 'dataMax']}
                 stroke='#82ca9d'/>
          <Tooltip formatter={(value: any, name: any) => ([`${value}${name === 'p' ? " %" : " шт"}`])}/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Line style={hiddenVal ? {display: 'none'} : {}}
                yAxisId="left"
                type='monotone'
                dataKey='v1'
                stroke='#8884d8'
                strokeWidth={3}/>
          <Line style={hiddenProc ? {display: 'none'} : {}}
                yAxisId="right"
                type="monotone"
                dataKey='p'
                stroke='#82ca9d'
                strokeWidth={3}/>
          {/*<YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} minTickGap={600}/>*/}
          {/*<Line yAxisId="left" type='monotone' dataKey='v2' stroke='#82ca9d' strokeWidth={3}/>*/}
          <Legend iconSize={0}
                  verticalAlign="top"
                  formatter={(line) => (<div className={classes.headGraph}>
                        <h3 className={line === 'v1' ? classes.titleName : classes.hiddenTitleName}>{title}&emsp;</h3>
                        {line === 'v1'
                          ? <CheckedValueGraph description={'значение'} hidden={hiddenVal} line={line}
                                               hideLineClick={hideLineClick} />
                          : <CheckedValueGraph description={'%'} hidden={hiddenProc} line={line}
                                               hideLineClick={hideLineClick}/>}
                      </div>
                  )}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;
