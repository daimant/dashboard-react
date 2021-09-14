import React, {forwardRef, MouseEvent, useState} from 'react';
import classes from './GraphLine.module.scss';
import {ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ReferenceLine} from 'recharts';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {GraphLineType} from '../../../Types/Types';
import SettingsIcon from '../../../Assets/SettingsIcon.svg';
import {IconButton} from '@material-ui/core';
import Menu from '@material-ui/core/Menu/Menu';
import cn from 'classnames';
import AboutWidget from '../../Common/AboutWidget/AboutWidget';

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

const CheckedValueGraph = forwardRef(({description, hidden, hideLineClick, line, hider}: CheckedValueGraphType, ref: any) => {
  return (
    <p
      className={cn(classes.propertiesGroup, classes.clickable, classes.unselectable, classes[`color${line}`])}
      ref={ref}
      onClick={() => hideLineClick(line, hidden, hider)}>
      {!hidden
        ? <CheckBoxIcon className={classes.iconCheckBox}
                        color='action'
                        component={'svg'}
                        fontSize={'small'}/>
        : <CheckBoxOutlineBlankIcon className={classes.iconCheckBox}
                                    color='action'
                                    component={'svg'}
                                    fontSize={'small'}/>
      } {description}
    </p>
  )
});

const dictDescriptionAbout: { [key: string]: string } = {
  'Своевременность': '',
  'Оперативность': '',
  'Качество работы': '',
  'Выполненные ЗНО без ШК или КЭNULL': '',
  'Выполненные ЗНО с неверными ШК': '',
  'ШК без группы сопровождения': '',
  'Доля ЗНО, выполненных в день обращения': '',
  'Среднее время выполнения запроса': '',
  'Количество Штрафов/Возвратов/ФРОД': '',
};

const dictTitlesWithoutGoalLine = [
  'Выполненные ЗНО без ШК или КЭNULL',
  'Выполненные ЗНО с неверными ШК',
  'ШК без группы сопровождения',
  'Доля ЗНО, выполненных в день обращения',
  'Среднее время выполнения запроса',
  'Количество Штрафов/Возвратов/ФРОД',
];

const dictTitlesWithoutProc = [
  'ШК без группы сопровождения',
  'Количество Штрафов/Возвратов/ФРОД',
];

const dictTitlesWithV2 = [
  'Доля ЗНО, выполненных в день обращения',
  'Среднее время выполнения запроса',
  'Количество Штрафов/Возвратов/ФРОД',
];

const dictTitlesWithV3 = ['Количество Штрафов/Возвратов/ФРОД',];

const dictTitlesWithOnlyV2 = [
  'Выполненные ЗНО без ШК или КЭNULL',
  'Выполненные ЗНО с неверными ШК',
];

const dictTitlesWhereV2InsteadProc = ['Среднее время выполнения запроса',];

const GraphLine = ({graphLineData, extendedStyle = {}}: PropsType) => {
  const {title, data, sumVal, avrProc} = graphLineData;
  const [hiddenVal, setHiddenVal] = useState(localStorage.getItem(`hiddenValGraph-${title}`) === '1' || false);
  const [hiddenVal2, setHiddenVal2] = useState(localStorage.getItem(`hiddenVal2Graph-${title}`) === '1' || false);
  const [hiddenVal3, setHiddenVal3] = useState(localStorage.getItem(`hiddenVal3Graph-${title}`) === '1' || false);
  const [hiddenProc, setHiddenProc] = useState(localStorage.getItem(`hiddenProcGraph-${title}`) === '1' || false);
  const [hiddenTar, setHiddenTar] = useState(localStorage.getItem(`hiddenTarGraph-${title}`) === '1' || false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const hideLineClick = (line: string, hidden: boolean, hider: (hidden: boolean) => void) => {
    localStorage.setItem(`hidden${line}Graph-${title}`, hidden ? '0' : '1');
    hider(!hidden);
  };

  const handleClickMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.graphs} style={extendedStyle}>
      <div className={classes.headGraph}>
        <IconButton aria-controls='menu'
                    className={classes.clickable}
                    href=''
                    onClick={handleClickMenu}>
          <img src={SettingsIcon} alt=''/>
        </IconButton>
        <Menu getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              id='menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
        >
          {title !== dictTitlesWithoutGoalLine[2] && <CheckedValueGraph description={'Количество'}
                                                                        hidden={hiddenVal}
                                                                        line={'Val'}
                                                                        hideLineClick={hideLineClick}
                                                                        hider={setHiddenVal}/>}
          {!dictTitlesWithoutProc.includes(title)
          && !dictTitlesWhereV2InsteadProc.includes(title) && <CheckedValueGraph description={'Значение'}
                                                                                 hidden={hiddenProc}
                                                                                 line={'Proc'}
                                                                                 hideLineClick={hideLineClick}
                                                                                 hider={setHiddenProc}/>
          }
          {!dictTitlesWithoutGoalLine.includes(title) && <CheckedValueGraph description={'Целевое значение'}
                                                                            hidden={hiddenTar}
                                                                            line={'Tar'}
                                                                            hideLineClick={hideLineClick}
                                                                            hider={setHiddenTar}/>
          }
          {dictTitlesWithV2.includes(title) && <CheckedValueGraph description={'Количество 2'}
                                                                  hidden={hiddenVal2}
                                                                  line={'Val2'}
                                                                  hideLineClick={hideLineClick}
                                                                  hider={setHiddenVal2}/>
          }
          {dictTitlesWithV3.includes(title) && <CheckedValueGraph description={'Количество 3'}
                                                                  hidden={hiddenVal3}
                                                                  line={'Val3'}
                                                                  hideLineClick={hideLineClick}
                                                                  hider={setHiddenVal3}/>
          }
          {sumVal && <p className={classes.propertiesGroup}>Общее количество за период: {sumVal} шт</p>}
          {!dictTitlesWithoutProc.includes(title) && !dictTitlesWhereV2InsteadProc.includes(title) && avrProc &&
          <p className={classes.propertiesGroup}>Средний процент за период: {avrProc} %</p>}
        </Menu>
        <h3 className={classes.title}>{title}</h3>
        <AboutWidget description={dictDescriptionAbout[title]}/>
      </div>
      <ResponsiveContainer>
        <ComposedChart data={data}
                       margin={{top: 10, bottom: 30}}
                       style={!data.length ? {display: 'none'} : {}}>
          <XAxis dataKey='d'
                 tickFormatter={tick => {
                   if (typeof tick !== 'string') {
                     tick = `${tick}`;
                   }
                   return tick.indexOf('-') > -1 ? `${tick.slice(0, 5)}-${tick.slice(11, 16)}` : tick.slice(0, 5);
                 }}
                 interval={data.length < 10 ? 0 : data.length < 25 ? 1 : 2}
                 allowDataOverflow={false}
                 axisLine={false}/>
          <YAxis style={hiddenVal ? {display: 'none'} : {fontSize: 14}}
                 tickFormatter={tick => tick < 100
                   ? `${Math.round(tick / 10) * 10}`
                   : tick < 1000
                     ? `${Math.round(tick / 100) * 100}`
                     : `${Math.round(tick / 1000) * 1000}`}
                 yAxisId='left'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 axisLine={false}
                 stroke='#2D6AA3'/>
          <YAxis style={
            (!dictTitlesWhereV2InsteadProc.includes(title) && hiddenProc)
            || (dictTitlesWhereV2InsteadProc.includes(title) && hiddenVal2)
            || dictTitlesWithoutProc.includes(title) ? {display: 'none'} : {fontSize: 14}}
                 tickFormatter={tick => tick.toFixed(1)}
                 yAxisId='right'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 axisLine={false}
                 orientation='right'
                 stroke={dictTitlesWhereV2InsteadProc.includes(title) ? '#E27F49' : '#8CC06D'}/>
          <Tooltip labelFormatter={label =>
            `${typeof label === 'string' && label.indexOf('-') > 0 ? 'Период' : 'Дата'}: ${label}`}
                   formatter={(value: string, name: any) => (
                     (dictTitlesWithoutProc.includes(title) || dictTitlesWhereV2InsteadProc.includes(title)) && name === 'p'
                       ? []
                       : [
                         `${name === 'v2' && title === dictTitlesWithoutGoalLine[4]
                           ? `${value.replace(/[.]/, 'ч')}м`
                           : value
                         }${name === 'p'
                           ? ' %'
                           : name === 'v2' && title === dictTitlesWithoutGoalLine[4]
                             ? ''
                             : ' шт'}`
                       ])}/>
          <Line display={hiddenVal ? 'none' : ''}
                yAxisId='left'
                type='monotone'
                dataKey={dictTitlesWithOnlyV2.includes(title) ? 'v2' : 'v1'}
                stroke='#2D6AA3'
                strokeWidth={2}/>
          {dictTitlesWithV2.includes(title) && <Line display={hiddenVal2 ? 'none' : ''}
                                                     yAxisId={dictTitlesWhereV2InsteadProc.includes(title) ? 'right' : 'left'}
                                                     type='monotone'
                                                     dataKey='v2'
                                                     stroke='#E27F49'
                                                     strokeWidth={2}/>}
          {dictTitlesWithV3.includes(title) && <Line display={hiddenVal3 ? 'none' : ''}
                                                     yAxisId='left'
                                                     type='monotone'
                                                     dataKey='v3'
                                                     stroke='#B1B47D'
                                                     strokeWidth={2}/>}
          <Line display={hiddenProc
          || dictTitlesWithoutProc.includes(title)
          || dictTitlesWhereV2InsteadProc.includes(title) ? 'none' : ''}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#8CC06D'
                strokeWidth={2}/>
          {!dictTitlesWithoutGoalLine.includes(title) && <ReferenceLine y={98}
                                                                        stroke='#FF0000'
                                                                        yAxisId='right'
                                                                        display={hiddenTar ? 'none' : ''}
                                                                        strokeDasharray='3 3'
                                                                        ifOverflow='extendDomain'/>}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphLine;
