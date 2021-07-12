import React, {FC} from 'react';
import classes from './GraphLine.module.scss';
import {ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ReferenceLine} from 'recharts';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {GraphLineType} from '../../Common/Types';
import SettingsIcon from '../../../Assets/Icons/SettingsIcon.svg';
import {IconButton} from "@material-ui/core";
import Menu from "@material-ui/core/Menu/Menu";


type CheckedValueGraphType = {
  description: string
  hidden: boolean
  line: string

  hideLineClick: (line: string, hidden: boolean, hider: (hidden: boolean) => void) => void
  hider: (hidden: boolean) => void
}
type PropsType = {
  graphLineData: GraphLineType
  extendedStyle?: object
}

const CheckedValueGraph: FC<CheckedValueGraphType> = ({description, hidden, hideLineClick, line, hider}) => {
  return (
    <p
      className={`${classes.checkBoxGroup} ${classes.clickable} ${classes[`color${line}`]}`}
      onClick={() => hideLineClick(line, hidden, hider)}>{description} {!hidden
      ? <CheckBoxIcon className={classes.iconCheckBox} color='action' component={'svg'} fontSize={'small'}/>
      :
      <CheckBoxOutlineBlankIcon className={classes.iconCheckBox} color='action' component={'svg'} fontSize={'small'}/>}
    </p>
  )
};

const GraphLine: FC<PropsType> = ({graphLineData, extendedStyle = {}}) => {
  const {title, data} = graphLineData;
  const [hiddenVal, setHiddenVal] = React.useState(localStorage.getItem(`hiddenValGraph-${title}`) === '1' || false);
  const [hiddenProc, setHiddenProc] = React.useState(localStorage.getItem(`hiddenProcGraph-${title}`) === '1' || false);
  const [hiddenTar, setHiddenTar] = React.useState(localStorage.getItem(`hiddenTarGraph-${title}`) === '1' || false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const hideLineClick = (line: string, hidden: boolean, hider: (hidden: boolean) => void) => {
    localStorage.setItem(`hidden${line}Graph-${title}`, hidden ? '0' : '1');
    hider(!hidden);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.graphs} style={extendedStyle}>
      <div className={classes.headGraph}>
        <IconButton aria-controls="menu" className={classes.clickable} href={''} onClick={handleClickMenu}>
          <img src={SettingsIcon} alt=''/>
        </IconButton>
        <Menu
          className={classes.menu}
          id='menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <CheckedValueGraph
            description={'значение'} hidden={hiddenVal} line={'Val'} hideLineClick={hideLineClick}
            hider={setHiddenVal}/>
          <CheckedValueGraph
            description={'%'} hidden={hiddenProc} line={'Proc'} hideLineClick={hideLineClick} hider={setHiddenProc}/>
          <CheckedValueGraph
            description={'целевое значение'} hidden={hiddenTar} line={'Tar'} hideLineClick={hideLineClick}
            hider={setHiddenTar}/>
        </Menu>
        <h3 className={classes.title}>{title}</h3>
      </div>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{top: 10, bottom: 30}}>
          <XAxis dataKey='d' allowDataOverflow={false} tickCount={10} axisLine={false}/>
          <YAxis style={hiddenVal ? {display: 'none'} : {}}
                 tickFormatter={tick => tick < 100
                   ? `${Math.round(tick / 10) * 10}`
                   : tick < 1000
                     ? `${Math.round(tick / 100) * 100}`
                     : `${Math.round(tick / 1000) * 1000}`}
                 yAxisId='left'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 axisLine={false}
                 stroke='#8884d8'/>
          <YAxis style={hiddenProc ? {display: 'none'} : {}}
                 tickFormatter={tick => `${Math.round(tick * 10) / 10}`}
                 yAxisId='right'
                 domain={['dataMin', 'dataMax']}
                 tickCount={2}
                 axisLine={false}
                 orientation='right'
                 stroke='#82ca9d'/>
          <Tooltip labelFormatter={(label: string) => `Дата: ${label}`}
                   formatter={(value: any, name: any) => ([`${value}${name === 'p' ? ' %' : ' шт'}`])}/>
          <Line style={hiddenVal ? {display: 'none'} : {}}
                yAxisId='left'
                type='monotone'
                dataKey='v1'
                stroke='#8884d8'
                strokeWidth={2}/>
          <Line style={hiddenProc ? {display: 'none'} : {}}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#82ca9d'
                strokeWidth={2}/>
          <ReferenceLine y={98} stroke='#FF0000' yAxisId='right' style={hiddenTar ? {display: 'none'} : {}}
                         strokeDasharray="3 3" ifOverflow="extendDomain"/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphLine;
