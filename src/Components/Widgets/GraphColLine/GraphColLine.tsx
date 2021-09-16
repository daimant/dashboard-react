import React, {forwardRef, MouseEvent, useState} from 'react';
import classes from './GraphColLine.module.scss';
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  Bar,
} from 'recharts';
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

const dictDescriptionTooltip: { [key: string]: { v1: string, v2: string, v3: string, p: string } } = {
  'Ошибка при загрузке': {v1: '', v2: '', v3: '', p: ''},
  'Своевременность': {v1: 'Количество', v2: 'Количество 2', v3: 'Количество 3', p: 'Значение'},
  'Оперативность': {v1: 'Количество', v2: 'Количество 2', v3: 'Количество 3', p: 'Значение'},
  'Качество работы': {v1: 'Количество', v2: 'Количество 2', v3: 'Количество 3', p: 'Значение'},
  'Выполненные ЗНО без ШК или КЭNULL': {v1: 'ЗНО без ШК', v2: 'Количество 2', v3: 'Количество 3', p: '% ЗНО без ШК'},
  'Выполненные ЗНО с неверными ШК': {
    v1: 'ЗНО с не верным ШК', v2: 'Количество 2', v3: 'Количество 3', p: '% ЗНО с не верным ШК'
  },
  'ШК без группы сопровождения': {v1: 'Количество', v2: 'Количество 2', v3: 'Количество 3', p: 'Значение'},
  'Доля ЗНО, выполненных в день обращения': {
    v1: 'Выполнено ЗНО', v2: 'Выполнено в день обращения', v3: 'Количество 3', p: '% Выполненных в день обращения'
  },
  'Среднее время выполнения запроса': {
    v1: 'Выполнено ЗНО',
    v2: 'Среднее время выполнения',
    v3: 'Количество 3',
    p: 'Значение'
  },
  'Количество Штрафов/Возвратов/ФРОД': {v1: 'Штрафов', v2: 'Возвратов', v3: 'ЗНО с ФРОД', p: 'Значение'},
};

const GraphColLine = ({graphLineData, extendedStyle = {}}: PropsType) => {
  const {title, data, sumVal, avrProc} = graphLineData;
  const [hiddenVal, setHiddenVal] = useState(localStorage.getItem(`hiddenValGraph-${title}`) === '1' || false);
  const [hiddenVal2, setHiddenVal2] = useState(localStorage.getItem(`hiddenVal2Graph-${title}`) === '1' || false);
  const [hiddenProc, setHiddenProc] = useState(localStorage.getItem(`hiddenProcGraph-${title}`) === '1' || false);
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
          <CheckedValueGraph description={dictDescriptionTooltip[title].v1}
                             hidden={hiddenVal}
                             line={'Val'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenVal}/>
          <CheckedValueGraph description={dictDescriptionTooltip[title].v2}
                             hidden={hiddenVal2}
                             line={'Val2'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenVal2}/>
          <CheckedValueGraph description={dictDescriptionTooltip[title].p}
                             hidden={hiddenProc}
                             line={'Proc'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenProc}/>

          {sumVal && <p className={classes.propertiesGroup}>Общее количество за период: {sumVal} шт</p>}
          {avrProc &&
          <p className={classes.propertiesGroup}>Средний процент за период: {avrProc} %</p>}
        </Menu>
        <h3 className={classes.title}>{!data?.length && title !== 'Ошибка при загрузке' ? `${title} - Нет данных` : title}</h3>
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
                 interval={data.length < 10 ? 1 : data.length < 25 ? 2 : 3}
                 allowDataOverflow={false}
                 axisLine={false}/>
          <YAxis style={hiddenVal && hiddenVal2 ? {display: 'none'} : {fontSize: 11}}
                 tickFormatter={tick => tick < 100
                   ? `${Math.round(tick / 10) * 10}шт`
                   : tick < 1000
                     ? `${Math.round(tick / 100) * 100}шт`
                     : `${Math.round(tick / 1000) * 1000}шт`}
                 yAxisId='left'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 axisLine={false}
                 stroke='#2D6AA3'/>
          <YAxis style={{fontSize: 11}}
                 tickFormatter={tick => `${tick.toFixed(0)}%`}
                 yAxisId='right'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 axisLine={false}
                 orientation='right'
                 stroke={'#8CC06D'}/>
          <Bar display={hiddenVal ? 'none' : ''}
               dataKey="v1"
               yAxisId='left'
               stackId="a"
               fill="#2D6AA3"/>
          <Bar display={hiddenVal2 ? 'none' : ''}
               dataKey="v2"
               yAxisId='left'
               stackId="a"
               fill="#E27F49"/>
          <Line display={hiddenProc ? 'none' : ''}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#8CC06D'
                strokeWidth={2}/>
          <Tooltip labelFormatter={label =>
            `${typeof label === 'string' && label.indexOf('-') > 0 ? 'Период' : 'Дата'}: ${label}`}
                   formatter={(value: string, name: string) => `${value}${name === 'p' ? ' %' : ' шт'}`}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphColLine;
