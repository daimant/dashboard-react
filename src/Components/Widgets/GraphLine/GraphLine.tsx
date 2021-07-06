import React, {FC} from 'react';
import classes from './GraphLine.module.scss';
import {ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line} from 'recharts';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {GraphLineType} from '../../Common/Types';

type CheckedValueGraphType = {
  description: string
  hidden: boolean
  line: string

  hideLineClick: (line: string) => void
}
type PropsType = {
  graphLineData: GraphLineType
  extendedStyle?: object
}

const CheckedValueGraph: FC<CheckedValueGraphType> = ({description, hidden, hideLineClick, line}) => {
  if (description === '') return <></>;

  return (
    <h3 className={classes.checkBoxGroup} onClick={() => hideLineClick(line)}>{description} {!hidden
      ? <CheckBoxIcon className={classes.iconCheckBox} color='action' fontSize='small' component={'svg'}/>
      : <CheckBoxOutlineBlankIcon className={classes.iconCheckBox} color='action' fontSize='small' component={'svg'}/>}
    </h3>
  )
};

const GraphLine: FC<PropsType> = ({graphLineData, extendedStyle = {}}) => {
  const {title, data} = graphLineData;
  const showValueLine = data?.length && data[0].v1;
  const showPercentLine = data?.length && !data[0].p;
  const [hiddenVal, setHiddenVal] = React.useState(localStorage.getItem(`hiddenValGraph-${title}`) === '1' || false);
  const [hiddenProc, setHiddenProc] = React.useState(localStorage.getItem(`hiddenProcGraph-${title}`) === '1' || false);

  const hideLineClick = (line: string) => {
    if (line === 'v1') {
      localStorage.setItem(`hiddenValGraph-${title}`, hiddenVal ? '0' : '1');
      setHiddenVal(!hiddenVal);
    }
    if (line === 'p') {
      localStorage.setItem(`hiddenProcGraph-${title}`, hiddenProc ? '0' : '1');
      setHiddenProc(!hiddenProc);
    }
  };

  return (
    <div className={classes.graphs} style={extendedStyle}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{top: -10}}>
          <XAxis dataKey='d'/>
          <YAxis style={hiddenVal ? {display: 'none'} : {}}
                 yAxisId='left'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 stroke='#8884d8'/>
          <YAxis style={hiddenProc ? {display: 'none'} : {}}
                 tickFormatter={tick => `${(Math.round(tick * 10) / 10)}`}
                 yAxisId='right'
                 orientation='right'
                 tickCount={3}
                 domain={['dataMin', 'dataMax']}
                 stroke='#82ca9d'/>
          <Tooltip formatter={(value: any, name: any) => ([`${value}${name === 'p' ? ' %' : ' шт'}`])}/>
          <Line style={hiddenVal ? {display: 'none'} : {}}
                yAxisId='left'
                type='monotone'
                dataKey='v1'
                stroke='#8884d8'
                strokeWidth={3}/>
          <Line style={hiddenProc ? {display: 'none'} : {}}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#82ca9d'
                strokeWidth={3}/>
          <Legend iconSize={0}
                  verticalAlign='top'
                  formatter={(line) => (<div className={classes.headGraph}>
                      <h3 className={line === 'v1' ? classes.titleName : classes.hiddenTitleName}>{title}&emsp;</h3>
                      {line === 'v1'
                        ? <CheckedValueGraph
                          description={showValueLine || (showValueLine && showPercentLine) !== undefined ? 'значение' : ''}
                          hidden={hiddenVal} line={line} hideLineClick={hideLineClick}/>
                        : <CheckedValueGraph
                          description={showPercentLine || (showValueLine && showPercentLine) !== undefined ? '%' : ''}
                          hidden={hiddenProc} line={line} hideLineClick={hideLineClick}/>}
                    </div>
                  )}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphLine;
