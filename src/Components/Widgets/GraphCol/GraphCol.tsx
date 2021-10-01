import React, {forwardRef, MouseEvent, useState} from 'react';
import classes from './GraphCol.module.scss';
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
import {GraphLineElementsType, GraphLineType} from '../../../Types/Types';
import SettingsIcon from '../../../Assets/SettingsIcon.svg';
import {IconButton} from '@material-ui/core';
import Menu from '@material-ui/core/Menu/Menu';
import cn from 'classnames';
import AboutWidget from '../../Common/AboutWidget/AboutWidget';
import {defaultDescriptionTooltipValues} from "../GraphLine/GraphLine";

type PropsType = {
  graphColData: GraphLineType
  extendedStyle?: object
  serviceOid: string
}

type CheckedValueGraphType = {
  description: string
  hidden: boolean
  line: string

  hideLineClick: (line: string, hidden: boolean, hider: (hidden: boolean) => void) => void
  hider: (hidden: boolean) => void
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
  id9: '',
};

const dictDescriptionTooltip: { [key: string]: { v1: string, v2: string, v3: string, p: string } } = {
  id9: {
    v1: 'Общее количество',
    v2: 'Из них выполнено в день обращения',
    v3: 'Количество 3',
    p: '% Выполненных в день обращения'
  },
  idundefined: defaultDescriptionTooltipValues,
};

const GraphCol = ({graphColData, extendedStyle = {}, serviceOid}: PropsType) => {
  const {id, title, data, sumVal, avrProc} = graphColData;
  const [hiddenVal, setHiddenVal] = useState(JSON.parse(localStorage.getItem(`hiddenValGraph-${id}`) || 'true'));
  const [hiddenVal2, setHiddenVal2] = useState(JSON.parse(localStorage.getItem(`hiddenVal2Graph-${id}`) || 'true'));
  const [hiddenProc, setHiddenProc] = useState(JSON.parse(localStorage.getItem(`hiddenProcGraph-${id}`) || 'true'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (serviceOid === '0' && id! <= 3) {
    data.length = 0;
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
          <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.v1}
                             hidden={hiddenVal}
                             line={'Val'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenVal}/>
          <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.v2}
                             hidden={hiddenVal2}
                             line={'Val2'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenVal2}/>
          <CheckedValueGraph description={dictDescriptionTooltip[`id${id}`]?.p}
                             hidden={hiddenProc}
                             line={'Proc'}
                             hideLineClick={hideLineClick}
                             hider={setHiddenProc}/>

          {sumVal && <p className={classes.propertiesGroup}>Общее количество за период: {sumVal} шт</p>}
          {avrProc &&
          <p className={classes.propertiesGroup}>Средний процент за период: {avrProc} %</p>}
        </Menu>
        <h3 className={classes.title}>{!data?.length && serviceOid === '0' && id! <= 3
          ? `${title} - Выберете услугу`
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
                 interval={data.length < 10 ? 1 : data.length < 25 ? 2 : 3}
                 allowDataOverflow={false}
                 axisLine={false}/>
          <YAxis display={hiddenVal || hiddenVal2 ? '' : 'none'}
                 tickFormatter={tick => tick < 100
                   ? `${Math.round(tick / 10) * 10}шт`
                   : tick < 1000
                     ? `${Math.round(tick / 100) * 100}шт`
                     : `${Math.round(tick / 1000) * 1000}шт`}
                 yAxisId='left'
                 domain={['dataMin', 'dataMax']}
                 tickCount={3}
                 axisLine={false}
                 stroke='#2D6AA3'
                 fontSize={11}/>
          <YAxis display={hiddenProc ? '' : 'none'}
                 tickFormatter={tick => `${Number(tick.toFixed(2))}%`}
                 yAxisId='right'
                 domain={[0, 100]}
                 tickCount={3}
                 minTickGap={100}
                 axisLine={false}
                 orientation='right'
                 stroke={'#8CC06D'}
                 fontSize={11}/>
          <Bar display={hiddenVal2 ? '' : 'none'}
               dataKey='v2'
               yAxisId='left'
               stackId='a'
               fill='#E27F49'/>
          <Bar display={hiddenVal ? '' : 'none'}
               dataKey='v1'
               yAxisId='left'
               stackId='a'
               fill='#2D6AA3'/>
          <Line display={hiddenProc ? '' : 'none'}
                yAxisId='right'
                type='monotone'
                dataKey='p'
                stroke='#8CC06D'
                strokeWidth={2}/>
          <Tooltip labelFormatter={label =>
            `${typeof label === 'string' && label.indexOf('-') > 0 ? 'Период' : 'Дата'}: ${label}`}
                   formatter={(value: string, name: 'v1' | 'v2' | 'v3' | 'p', obj: { payload: GraphLineElementsType }) =>
                     name === 'v1'
                       ? [`${dictDescriptionTooltip[`id${id}`][name]}: ${obj.payload.sumV1V2} шт`]
                       : [`${dictDescriptionTooltip[`id${id}`][name]}: ${value}${name === 'p' ? ' %' : ' шт'}`]}
                   itemSorter={(obj) => obj.dataKey === 'v1' ? -1 : 1}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphCol;
