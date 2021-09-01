import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './KPKTable.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import {KPKType} from '../../../Types/Types';
import {FetchError} from '../../Common/FetchError/FetchError';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles, Theme, makeStyles} from '@material-ui/core/styles';
import cn from 'classnames';
import {RequestServicesChildType} from '../../../Types/Types';

type PropsType = {
  orgOid: string
  period: string
  periodType: string
  kpk: KPKType

  requestServicesChild: ({orgOid, period, periodType, serviceOid}: RequestServicesChildType) => void
  removeServicesChild: () => void
  setServiceOid: (serviceOid?: string) => void
}

type CheckedValueKPKType = {
  hidden: boolean
  requestSetHiddenUnusedKPK: () => void
}

const useStyles = makeStyles(() => ({
    toggle: {
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#e21a1a',
      },
    },
  })
);

const CheckedValueKPK = ({hidden, requestSetHiddenUnusedKPK}: CheckedValueKPKType) => {
  const classesMUI = useStyles();

  return (
    <span className={cn(classes.clickable, classes.unselectable)}>{
      <FormControlLabel control={<Switch size='medium'
                                         checked={hidden}
                                         onChange={() => requestSetHiddenUnusedKPK()}
                                         color='default'
                                         className={classesMUI.toggle}/>}
                        labelPlacement='start'
                        label={<span className={cn(classes.textAroundSwitcher, classes.tableHead)}>
                          Все услуги / Услуги с ЗНО
                        </span>}
      />
    }</span>
  )
};

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 12,
    maxWidth: 500
  },
}))(Tooltip);

const nameColsDetails: any = {
  k1: 'Своевременность',
  k2: 'Оперативность',
  k3: 'Качество работы',
  k4: 'Удовлетворенность',
  k5: 'ППР',
};

const nameColsDetailsCallCentre: any = {
  k1: 'Доля пропущенных вызовов',
  k2: 'Доля обращений, обработанных не более чем за 15 мин',
  k3: 'Уровень обслуживания',
  k4: 'Доля некорректно маршрутизируемых обращений',
  k5: 'Доля неверно классифицированных обращений',
};

const KPKTable = ({
                    kpk, requestServicesChild, removeServicesChild, orgOid, period, periodType, setServiceOid
                  }: PropsType) => {
  const [hiddenUnusedKPK, setHiddenUnusedKPK] = useState(localStorage.getItem('KPKRowHidden') === '1' || false);

  if (!kpk?.cols?.length || !kpk?.rows?.length)
    return (
      <div className={cn(classes.kpkTable, classes.cell)}>
        <FetchError hasData={Boolean((!kpk?.rows || kpk.rows.length === 0) && kpk?.cols?.length > 2)}/>
      </div>
    );

  const {cols, rows} = kpk;
  const [id, colsHead, value] = cols;

  const requestSetHiddenUnusedKPK = () => {
    localStorage.setItem('KPKRowHidden', hiddenUnusedKPK ? '0' : '1');
    setHiddenUnusedKPK(!hiddenUnusedKPK);
  };

  const clickRequestServicesChild = (newServiceOid: string) => {
    setServiceOid(newServiceOid);
    requestServicesChild({orgOid, period, periodType, serviceOid: newServiceOid});
  };

  const clickRemoveServicesChild = () => {
    setServiceOid();
    removeServicesChild();
  };

  return (
    <div className={classes.kpkTable}>
      <TableContainer component={Paper}
                      className={classes.tableContainer}>
        <Table size='small'
               stickyHeader
               aria-label='a dense table'
               component={'table'}>
          <TableHead component={'thead'}>
            <TableRow component={'tr'}>
              <TableCell className={classes.cell}>
                <div className={classes.tableHead}>
                  {colsHead === 'Услуга' || colsHead === 'Ошибка при загрузке'
                    ? <span>{colsHead}</span>
                    : <span className={classes.tableHead}>
                        <CloseIcon fontSize='small'
                                   onClick={clickRemoveServicesChild}
                                   component={'svg'}/>
                      {colsHead}
                      </span>
                  }
                  <CheckedValueKPK hidden={hiddenUnusedKPK}
                                   requestSetHiddenUnusedKPK={requestSetHiddenUnusedKPK}/>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>{value}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={'tbody'}>
            {rows.map((row: any) => (
              <TableRow key={row[id]}
                        component={'tr'}
                        style={row[value] === '-' && hiddenUnusedKPK ? {display: 'none'} : {}}
                        className={cn({[classes.clickable]: row[value] !== '-' && colsHead === 'Услуга'})}
                        onClick={() => {
                          if (row[value] !== '-' && colsHead === 'Услуга') {
                            clickRequestServicesChild(row[id]);
                          }
                        }}>
                <TableCell component='th'
                           scope='row'
                           className={classes.cell}>{
                  row[colsHead]
                }</TableCell>
                <LightTooltip placement='right'
                              title={row[value] !== '-'
                                ? <div className={classes.blackColor}>
                                  {`${row[value]} состоит из:`}
                                  {cols.slice(3, 8).map((key: any) => (
                                    <span className={classes.tableHead}
                                      // className={cn(classes[row[`${key}_good`] ? 'greenColor' : 'redColor'], classes.tableHead)}
                                          key={key}>
                                      {row['Услуга'] === 'Контакт-центр' || row['Сервис'] === 'Контакт-центр'
                                        ? nameColsDetailsCallCentre[key]
                                        : nameColsDetails[key]}: {row[key]}
                                      {/*{nameColsDetails[key]}: {row[key]} {!row[`${key}_good`]*/}
                                      {/*? `(отклонение: ${(row[key + '_l'] - row[key]).toFixed(2)})`*/}
                                      {/*: ''}*/}
                                      </span>
                                  ))}
                                </div>
                                : ''}>
                  <TableCell className={cn(classes.cell, classes.rightColumn)}>{row[value]}</TableCell>
                </LightTooltip>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default KPKTable;
