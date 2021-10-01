import React, {forwardRef, MouseEvent, useState} from 'react';
import classes from './GraphLine.module.scss';
import {ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ReferenceLine, Bar} from 'recharts';
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
  serviceOid: string
}

const CheckedValueGraph = forwardRef(({description, hidden, hideLineClick, line, hider}: CheckedValueGraphType, ref: any) => {
  return (
    <p
      className={cn(classes.propertiesGroup, classes.clickable, classes.unselectable, classes[`color${line}`])}
      ref={ref}
      onClick={() => hideLineClick(line, hidden, hider)}>
      {hidden
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
  id1: 'Показатель, определяющий процент выполнения заявок без нарушения КС (контрольного срока)',
  id2: 'Показатель, определяющий процент выполнения заявок без нарушения МС (минимального контрольного срока)',
  id3: 'Показатель, определяющий процент заявок, выполненных без возврата на доработку (или ошибочным ' +
    'возвратом на доработку) пользователем',
  id6: '',
  id7: '',
  id8: '',
  id10: '',
  id11: '',
};

export const defaultDescriptionTooltipValues = {
  v1: 'Количество',
  v2: 'Количество 2',
  v3: 'Количество 3',
  p: 'Значение',
};

const dictDescriptionTooltip: { [key: string]: { v1: string, v2: string, v3: string, p: string } } = {
  id1: defaultDescriptionTooltipValues,
  id2: defaultDescriptionTooltipValues,
  id3: defaultDescriptionTooltipValues,
  id6: {
    v1: 'ЗНО без ШК',
    v2: defaultDescriptionTooltipValues.v2,
    v3: defaultDescriptionTooltipValues.v3,
    p: '% ЗНО без ШК',
  },
  id7: {
    v1: 'ЗНО с не верным ШК',
    v2: defaultDescriptionTooltipValues.v2,
    v3: defaultDescriptionTooltipValues.v3,
    p: '% ЗНО с не верным ШК',
  },
  id8: defaultDescriptionTooltipValues,
  id10: {
    v1: 'Выполнено ЗНО',
    v2: 'Среднее время выполнения',
    v3: defaultDescriptionTooltipValues.v3,
    p: defaultDescriptionTooltipValues.p,
  },
  id11: {
    v1: 'Штрафов',
    v2: 'Возвратов',
    v3: 'Фродов',
    p: defaultDescriptionTooltipValues.p,
  },
  idundefined: defaultDescriptionTooltipValues,
};

const dictIdWithoutTargetLine = [
  'id10',
  'id11',
  'id6',
  'id7',
  'id8',
];

const dictIdWithoutProc = [
  'id11',
  'id8',
];

const dictIdWithV2 = [
  'id10',
  'id11',
];

const dictIdWithV3 = [
  'id11',
];

const dictIdWithV2InsteadV1 = [
  'id6',
  'id7',
];

const dictIdV2InsteadProc = [
  'id10',
];

const dictTargetValues: { [key: string]: number } = {
  id1: 98,
  id2: 65,
  id3: 99.5,
};

const dictIdWithV1Col = [
  'id1',
  'id2',
  'id3',
  'id6',
  'id7',
  'id10',
];

const dictIdWithV1Line = [
  'id8',
  'id11',
];

const dictIdHiddenV1FromStart = [
  'id1',
  'id2',
  'id3',
];

const GraphLine = ({graphLineData, extendedStyle = {}, serviceOid}: PropsType) => {
  const {id, title, data, sumVal, avrProc} = graphLineData;
  const [hiddenVal, setHiddenVal] = useState(JSON.parse(localStorage.getItem(`hiddenValGraph-${id}`)
    || (dictIdHiddenV1FromStart.includes(`id${id}`) ? 'false' : 'true')));
  const [hiddenVal2, setHiddenVal2] = useState(JSON.parse(localStorage.getItem(`hiddenVal2Graph-${id}`) || 'true'));
  const [hiddenVal3, setHiddenVal3] = useState(JSON.parse(localStorage.getItem(`hiddenVal3Graph-${id}`) || 'true'));
  const [hiddenProc, setHiddenProc] = useState(JSON.parse(localStorage.getItem(`hiddenProcGraph-${id}`) || 'true'));
  const [hiddenTar, setHiddenTar] = useState(JSON.parse(localStorage.getItem(`hiddenTarGraph-${id}`) || 'true'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (serviceOid === '0' && id! <= 3) {
    data.length = 0;
  }

  let valuesYAxisLeft: number[] = [];
  let valuesYAxisRight: number[] = [];

  if (!dictIdWithV2InsteadV1.includes(`id${id}`)) {
    valuesYAxisLeft = valuesYAxisLeft.concat(data.map(el => el.v1));
  }
  if (dictIdWithV2InsteadV1.includes(`id${id}`)
    || (dictIdWithV2.includes(`id${id}`) && !dictIdV2InsteadProc.includes(`id${id}`))) {
    valuesYAxisLeft = valuesYAxisLeft.concat(data.map(el => Number(el.v2)));
  }
  if (dictIdWithV3.includes(`id${id}`)) {
    valuesYAxisLeft = valuesYAxisLeft.concat(data.map(el => el.v3!));
  }
  if (!dictIdWithoutProc.includes(`id${id}`) || !dictIdV2InsteadProc.includes(`id${id}`)) {
    valuesYAxisRight = valuesYAxisRight.concat(data.map(el => Number(el.p)));
  }
  if (dictIdV2InsteadProc.includes(`id${id}`)) {
    valuesYAxisRight = valuesYAxisRight.concat(data.map(el => Number(el.v2)));
  }

  const hideLineClick = (line: string, hidden: boolean, hider: (hidden: boolean) => void) => {
    localStorage.setItem(`hidden${line}Graph-${id}`, `${!hidden}`);
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
          {id !== 8 && <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.v1}
                                          hidden={hiddenVal}
                                          line={'Val'}
                                          hideLineClick={hideLineClick}
                                          hider={setHiddenVal}/>}
          {dictIdWithV2.includes(`id${id}`) &&
          <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.v2}
                             hidden={hiddenVal2}
                             line={'Val2'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenVal2}/>
          }
          {dictIdWithV3.includes(`id${id}`) &&
          <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.v3}
                             hidden={hiddenVal3}
                             line={'Val3'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenVal3}/>
          }

          {!dictIdWithoutProc.includes(`id${id}`) && !dictIdV2InsteadProc.includes(`id${id}`) &&
          <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.p}
                             hidden={hiddenProc}
                             line={'Proc'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenProc}/>
          }
          {!dictIdWithoutTargetLine.includes(`id${id}`) && <CheckedValueGraph description={'Целевое значение'}
                                                                              hidden={hiddenTar}
                                                                              line={'Tar'}
                                                                              hideLineClick={hideLineClick}
                                                                              hider={setHiddenTar}/>
          }
          {sumVal && <p className={classes.propertiesGroup}>Общее количество за период: {sumVal} шт</p>}
          {!dictIdWithoutProc.includes(`id${id}`) && !dictIdV2InsteadProc.includes(`id${id}`) && avrProc &&
          <p className={classes.propertiesGroup}>Средний процент за период: {avrProc} %</p>}
        </Menu>
        <h3 className={classes.title}>{!data?.length && serviceOid === '0' && id! <= 3
          ? `${title} - Выберите услугу`
          : !data?.length && title !== 'Ошибка при загрузке'
            ? `${title} - Нет данных`
            : title
        }</h3>
        <AboutWidget description={dictDescriptionAbout[`id${id}`]}/>
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
                 interval={dictIdWithoutTargetLine.includes(`id${id}`)
                   ? data.length < 10 ? 1 : data.length < 25 ? 2 : 3
                   : data.length < 10 ? 0 : data.length < 25 ? 1 : 2}
                 allowDataOverflow={false}
                 axisLine={false}/>
          <YAxis display={hiddenVal ? '' : 'none'}
                 tickFormatter={(tick, i) => {
                   const currCut = tick < 1000 ? 10 : tick < 10000 ? 100 : 1000;
                   return i ? `${Math.ceil(tick / currCut) * currCut}шт` : `${Math.floor(tick / currCut) * currCut}шт`;
                 }}
                 yAxisId='left'
                 domain={[Math.min(...valuesYAxisLeft), Math.max(...valuesYAxisLeft)]}
                 tickCount={3}
                 minTickGap={100}
                 axisLine={false}
                 stroke='#2D6AA3'
                 fontSize={11}/>
          <YAxis display={(!dictIdV2InsteadProc.includes(`id${id}`) && !hiddenProc)
          || (dictIdV2InsteadProc.includes(`id${id}`) && !hiddenVal2)
          || dictIdWithoutProc.includes(`id${id}`) ? 'none' : ''}
                 tickFormatter={tick => `${Number(tick.toFixed(2))}${dictIdV2InsteadProc.includes(`id${id}`) ? 'ч' : '%'}`}
                 yAxisId='right'
                 domain={dictIdV2InsteadProc.includes(`id${id}`)
                   ? [Math.min(...valuesYAxisRight), Math.max(...valuesYAxisRight)]
                   : [0, 100]}
                 tickCount={3}
                 minTickGap={100}
                 axisLine={false}
                 orientation='right'
                 stroke={dictIdV2InsteadProc.includes(`id${id}`) ? '#E27F49' : '#8CC06D'}
                 fontSize={11}/>
          {dictIdWithV1Col.includes(`id${id}`) && <Bar display={hiddenVal ? '' : 'none'}
                                                       dataKey={dictIdWithV2InsteadV1.includes(`id${id}`) ? 'v2' : 'v1'}
                                                       yAxisId='left'
                                                       stackId='a'
                                                       fill='#2D6AA3'/>}
          {dictIdWithV1Line.includes(`id${id}`) && <Line display={hiddenVal ? '' : 'none'}
                                                         yAxisId='left'
                                                         type='monotone'
                                                         dataKey={dictIdWithV2InsteadV1.includes(`id${id}`) ? 'v2' : 'v1'}
                                                         stroke='#2D6AA3'
                                                         strokeWidth={2}/>}
          {dictIdWithV2.includes(`id${id}`) && <Line display={hiddenVal2 ? '' : 'none'}
                                                     yAxisId={dictIdV2InsteadProc.includes(`id${id}`) ? 'right' : 'left'}
                                                     type='monotone'
                                                     dataKey='v2'
                                                     stroke='#E27F49'
                                                     strokeWidth={2}/>}
          {dictIdWithV3.includes(`id${id}`) && <Line display={hiddenVal3 ? '' : 'none'}
                                                     yAxisId='left'
                                                     type='monotone'
                                                     dataKey='v3'
                                                     stroke='#B1B47D'
                                                     strokeWidth={2}/>}
          <Line display={!hiddenProc
          || dictIdWithoutProc.includes(`id${id}`)
          || dictIdV2InsteadProc.includes(`id${id}`) ? 'none' : ''}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#8CC06D'
                strokeWidth={2}/>
          {!dictIdWithoutTargetLine.includes(`id${id}`) && <ReferenceLine y={dictTargetValues[`id${id}`]}
                                                                          stroke='#FF0000'
                                                                          yAxisId='right'
                                                                          display={hiddenTar ? '' : 'none'}
                                                                          strokeDasharray='3 3'
                                                                          ifOverflow='extendDomain'/>}
          <Tooltip labelFormatter={label =>
            `${typeof label === 'string' && label.indexOf('-') > 0 ? 'Период' : 'Дата'}: ${label}`}
                   formatter={(value: string, name: 'v1' | 'v2' | 'v3' | 'p') => (
                     (dictIdWithoutProc.includes(`id${id}`) || dictIdV2InsteadProc.includes(`id${id}`)) && name === 'p'
                       ? []
                       : [
                         `${dictIdWithV2InsteadV1.includes(`id${id}`) && name === 'v2'
                           ? dictDescriptionTooltip[`id${id}`].v1
                           : dictDescriptionTooltip[`id${id}`][name]}: 
                         ${name === 'v2' && id === 10
                           ? `${value.replace(/[.]/, 'ч')}м`
                           : value}
                         ${name === 'p'
                           ? ' %'
                           : name === 'v2' && id === 10
                             ? ''
                             : ' шт'}`
                       ])}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
};

export default GraphLine;
