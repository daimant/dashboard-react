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
  'Своевременность': 'Показатель, определяющий процент выполнения заявок без нарушения КС (контрольного срока)',
  'Оперативность': 'Показатель, определяющий процент выполнения заявок без нарушения МС (минимального контрольного срока)',
  'Качество работы': 'Показатель, определяющий процент заявок, выполненных без возврата на доработку (или ошибочным ' +
    'возвратом на доработку) пользователем',
  'Выполненные ЗНО без ШК или КЭNULL': '',
  'Выполненные ЗНО с неверными ШК': '',
  'ШК без группы сопровождения': '',
  'Среднее время выполнения запроса': '',
  'Количество Штрафов/Возвратов/ФРОД': '',
};

const defaultDescriptionTooltipValues = {
  v1: 'Количество',
  v2: 'Количество 2',
  v3: 'Количество 3',
  p: 'Значение',
};

const dictDescriptionTooltip: { [key: string]: { v1: string, v2: string, v3: string, p: string } } = {
  'Своевременность': defaultDescriptionTooltipValues,
  'Оперативность': defaultDescriptionTooltipValues,
  'Качество работы': defaultDescriptionTooltipValues,
  'Среднее время выполнения запроса': {
    v1: 'Выполнено ЗНО',
    v2: 'Среднее время выполнения',
    v3: defaultDescriptionTooltipValues.v3,
    p: defaultDescriptionTooltipValues.p,
  },
  'Количество Штрафов/Возвратов/ФРОД': {
    v1: 'Штрафов',
    v2: 'Возвратов',
    v3: 'ЗНО с ФРОД',
    p: defaultDescriptionTooltipValues.p,
  },
  'Выполненные ЗНО без ШК или КЭNULL': {
    v1: 'ЗНО без ШК',
    v2: defaultDescriptionTooltipValues.v2,
    v3: defaultDescriptionTooltipValues.v3,
    p: '% ЗНО без ШК',
  },
  'Выполненные ЗНО с неверными ШК': {
    v1: 'ЗНО с не верным ШК',
    v2: defaultDescriptionTooltipValues.v2,
    v3: defaultDescriptionTooltipValues.v3,
    p: '% ЗНО с не верным ШК',
  },
  'ШК без группы сопровождения': defaultDescriptionTooltipValues,
  'Ошибка при загрузке': defaultDescriptionTooltipValues,
};

const dictTitlesWithoutTargetLine = [
  'Среднее время выполнения запроса',
  'Количество Штрафов/Возвратов/ФРОД',
  'Выполненные ЗНО без ШК или КЭNULL',
  'Выполненные ЗНО с неверными ШК',
  'ШК без группы сопровождения',
];

const dictTitlesWithoutProc = [
  'Количество Штрафов/Возвратов/ФРОД',
  'ШК без группы сопровождения',
];

const dictTitlesWithV2 = [
  'Среднее время выполнения запроса',
  'Количество Штрафов/Возвратов/ФРОД',
];

const dictTitlesWithV3 = [
  'Количество Штрафов/Возвратов/ФРОД',
];

const dictTitlesWithV2InsteadV1 = [
  'Выполненные ЗНО без ШК или КЭNULL',
  'Выполненные ЗНО с неверными ШК',
];

const dictTitlesWithV2InsteadProc = [
  'Среднее время выполнения запроса',
];

const dictTargetValues: {[key: string]: number} = {
  'Своевременность': 98,
  'Оперативность': 65,
  'Качество работы': 99.5,
};

const GraphLine = ({graphLineData, extendedStyle = {}}: PropsType) => {
  const {title, data, sumVal, avrProc} = graphLineData;
  const [hiddenVal, setHiddenVal] = useState(localStorage.getItem(`hiddenValGraph-${title}`) === '1' || false);
  const [hiddenVal2, setHiddenVal2] = useState(localStorage.getItem(`hiddenVal2Graph-${title}`) === '1' || false);
  const [hiddenVal3, setHiddenVal3] = useState(localStorage.getItem(`hiddenVal3Graph-${title}`) === '1' || false);
  const [hiddenProc, setHiddenProc] = useState(localStorage.getItem(`hiddenProcGraph-${title}`) === '1' || false);
  const [hiddenTar, setHiddenTar] = useState(localStorage.getItem(`hiddenTarGraph-${title}`) === '1' || false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  let valuesYAxisLeft: number[] = [];
  let valuesYAxisRight: number[] = [];

  if (!dictTitlesWithV2InsteadV1.includes(title)) {
    valuesYAxisLeft = valuesYAxisLeft.concat(data.map(el => el.v1));
  }
  if (dictTitlesWithV2InsteadV1.includes(title)
    || (dictTitlesWithV2.includes(title) && !dictTitlesWithV2InsteadProc.includes(title))) {
    valuesYAxisLeft = valuesYAxisLeft.concat(data.map(el => Number(el.v2)));
  }
  if (dictTitlesWithV3.includes(title)) {
    valuesYAxisLeft = valuesYAxisLeft.concat(data.map(el => el.v3!));
  }
  if (!dictTitlesWithoutProc.includes(title) || !dictTitlesWithV2InsteadProc.includes(title)) {
    valuesYAxisRight = valuesYAxisRight.concat(data.map(el => Number(el.p)));
  }
  if (dictTitlesWithV2InsteadProc.includes(title)) {
    valuesYAxisRight = valuesYAxisRight.concat(data.map(el => Number(el.v2)));
  }

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
                    onClick={handleClickMenu}
                    disabled={!data?.length || title === 'Ошибка при загрузке'}>
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
          {title !== 'ШК без группы сопровождения' && <CheckedValueGraph description={dictDescriptionTooltip[title].v1}
                                                                         hidden={hiddenVal}
                                                                         line={'Val'}
                                                                         hideLineClick={hideLineClick}
                                                                         hider={setHiddenVal}/>}
          {dictTitlesWithV2.includes(title) && <CheckedValueGraph description={dictDescriptionTooltip[title].v2}
                                                                  hidden={hiddenVal2}
                                                                  line={'Val2'}
                                                                  hideLineClick={hideLineClick}
                                                                  hider={setHiddenVal2}/>
          }
          {dictTitlesWithV3.includes(title) && <CheckedValueGraph description={dictDescriptionTooltip[title].v3}
                                                                  hidden={hiddenVal3}
                                                                  line={'Val3'}
                                                                  hideLineClick={hideLineClick}
                                                                  hider={setHiddenVal3}/>
          }

          {!dictTitlesWithoutProc.includes(title) && !dictTitlesWithV2InsteadProc.includes(title) &&
          <CheckedValueGraph description={dictDescriptionTooltip[title].p}
                             hidden={hiddenProc}
                             line={'Proc'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenProc}/>
          }
          {!dictTitlesWithoutTargetLine.includes(title) && <CheckedValueGraph description={'Целевое значение'}
                                                                              hidden={hiddenTar}
                                                                              line={'Tar'}
                                                                              hideLineClick={hideLineClick}
                                                                              hider={setHiddenTar}/>
          }
          {sumVal && <p className={classes.propertiesGroup}>Общее количество за период: {sumVal} шт</p>}
          {!dictTitlesWithoutProc.includes(title) && !dictTitlesWithV2InsteadProc.includes(title) && avrProc &&
          <p className={classes.propertiesGroup}>Средний процент за период: {avrProc} %</p>}
        </Menu>
        <h3
          className={classes.title}>{!data?.length && title !== 'Ошибка при загрузке' ? `${title} - Нет данных` : title}</h3>
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
                 interval={dictTitlesWithoutTargetLine.includes(title)
                   ? data.length < 10 ? 1 : data.length < 25 ? 2 : 3
                   : data.length < 10 ? 0 : data.length < 25 ? 1 : 2}
                 allowDataOverflow={false}
                 axisLine={false}/>
          <YAxis style={hiddenVal ? {display: 'none'} : {fontSize: 11}}
                 tickFormatter={(tick, i) => {
                   const currCut = tick < 1000 ? 10 : tick < 10000 ? 100 : 1000;
                   return i ? `${Math.ceil(tick / currCut) * currCut}шт` : `${Math.floor(tick / currCut) * currCut}шт`;
                 }}
                 yAxisId='left'
                 domain={[Math.min(...valuesYAxisLeft), Math.max(...valuesYAxisLeft)]}
                 tickCount={3}
                 minTickGap={100}
                 axisLine={false}
                 stroke='#2D6AA3'/>
          <YAxis style={
            (!dictTitlesWithV2InsteadProc.includes(title) && hiddenProc)
            || (dictTitlesWithV2InsteadProc.includes(title) && hiddenVal2)
            || dictTitlesWithoutProc.includes(title) ? {display: 'none'} : {fontSize: 11}}
                 tickFormatter={tick => `${tick.toFixed(1)}${dictTitlesWithV2InsteadProc.includes(title) ? 'ч' : '%'}`}
                 yAxisId='right'
                 domain={[Math.min(...valuesYAxisRight), Math.max(...valuesYAxisRight)]}
                 tickCount={3}
                 minTickGap={100}
                 axisLine={false}
                 orientation='right'
                 stroke={dictTitlesWithV2InsteadProc.includes(title) ? '#E27F49' : '#8CC06D'}/>
          <Line display={hiddenVal ? 'none' : ''}
                yAxisId='left'
                type='monotone'
                dataKey={dictTitlesWithV2InsteadV1.includes(title) ? 'v2' : 'v1'}
                stroke='#2D6AA3'
                strokeWidth={2}/>
          {dictTitlesWithV2.includes(title) && <Line display={hiddenVal2 ? 'none' : ''}
                                                     yAxisId={dictTitlesWithV2InsteadProc.includes(title) ? 'right' : 'left'}
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
          || dictTitlesWithV2InsteadProc.includes(title) ? 'none' : ''}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#8CC06D'
                strokeWidth={2}/>
          {!dictTitlesWithoutTargetLine.includes(title) && <ReferenceLine y={dictTargetValues[title]}
                                                                          stroke='#FF0000'
                                                                          yAxisId='right'
                                                                          display={hiddenTar ? 'none' : ''}
                                                                          strokeDasharray='3 3'
                                                                          ifOverflow='extendDomain'/>}
          <Tooltip labelFormatter={label =>
            `${typeof label === 'string' && label.indexOf('-') > 0 ? 'Период' : 'Дата'}: ${label}`}
                   formatter={(value: string, name: 'v1' | 'v2' | 'v3' | 'p') => (
                     (dictTitlesWithoutProc.includes(title) || dictTitlesWithV2InsteadProc.includes(title)) && name === 'p'
                       ? []
                       : [
                         `${dictTitlesWithV2InsteadV1.includes(title) && name === 'v2'
                           ? dictDescriptionTooltip[title]['v1']
                           : dictDescriptionTooltip[title][name]}: 
                         ${name === 'v2' && title === 'Среднее время выполнения запроса'
                           ? `${value.replace(/[.]/, 'ч')}м`
                           : value}
                         ${name === 'p'
                           ? ' %'
                           : name === 'v2' && title === 'Среднее время выполнения запроса'
                             ? ''
                             : ' шт'}`
                       ])}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphLine;
