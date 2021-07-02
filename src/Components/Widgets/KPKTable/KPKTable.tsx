import React, {FC} from 'react';
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
import {KPKType} from '../../Common/Types';
import {FetchError} from '../../Common/FetchError/FetchError';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles, Theme, makeStyles} from '@material-ui/core/styles';

type PropsType = {
  orgOid: string
  period: string
  periodType: string
  kpk: KPKType

  requestKPKChild: (orgOid: string, period: string, periodType: string, serviceOid: number) => void
  removeKPKChild: () => void
}
type CheckedValueKPKType = {
  hidden: boolean
  requestSetHiddenUnusedKPK: () => void
}

const CheckedValueKPK: FC<CheckedValueKPKType> = ({hidden, requestSetHiddenUnusedKPK}) => {
  const useStyles = makeStyles(() => ({
      toggle: {
        '& .Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#52d869'
        },
      },
    })
  );
  const classesMUI = useStyles();

  return (
    <span className={classes.clickable}>{
      <FormControlLabel
        control={
          <Switch
            size="medium"
            checked={hidden}
            onChange={() => requestSetHiddenUnusedKPK()}
            color="default"
            className={classesMUI.toggle}
          />}
        labelPlacement="start"
        label={<span className={`${classes.textAroundSwitcher} ${classes.tableHead}`}>Все услуги / Услуги с ЗНО</span>}
      />
    }</span>
  )
};
const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

const KPKTable: FC<PropsType> = ({kpk, requestKPKChild, removeKPKChild, orgOid, period, periodType}) => {
  const [hiddenUnusedKPK, setHiddenUnusedKPK] = React.useState(localStorage.getItem('KPKRowHidden') === "1" || false);

  if (!kpk?.cols?.length)
    return (
      <div className={`${classes.kpkTable} ${classes.cell}`}>
        <FetchError/>
      </div>
    );

  const {cols, rows} = kpk;
  const [id, colsHead, value] = cols;
  const requestSetHiddenUnusedKPK = () => {
    localStorage.setItem('KPKRowHidden', hiddenUnusedKPK ? "0" : '1');
    setHiddenUnusedKPK(!hiddenUnusedKPK);
  };
  const randomValuesArrs = [
    ['Своевременность', (Math.random() * 5 + 95).toFixed(2)],
    ['Оперативность', (Math.random() * 5 + 95).toFixed(2)],
    ['Качество работы', (Math.random() * 5 + 95).toFixed(2)],
    ['Четвертый параметр', (Math.random() * 5 + 95).toFixed(2)],
    ['Пятый параметр', (Math.random() * 5 + 95).toFixed(2)]
  ];

  return (
    <div className={classes.kpkTable}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small" stickyHeader aria-label="a dense table" component={'table'}>
          <TableHead component={'thead'}>
            <TableRow component={"tr"}>
              <TableCell className={classes.cell}>
                <div className={classes.tableHead}>
                  {colsHead === 'Услуга' || colsHead === 'Ошибка при загрузке'
                    ? <span>{colsHead}</span>
                    : <span className={classes.tableHead}>
                        <CloseIcon fontSize='small' onClick={removeKPKChild} component={'span'}/>{colsHead}
                      </span>
                  }
                  <CheckedValueKPK hidden={hiddenUnusedKPK} requestSetHiddenUnusedKPK={requestSetHiddenUnusedKPK}/>
                </div>
              </TableCell>
              <TableCell className={classes.cell}>{value}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={'tbody'}>
            {rows.map((row: any) => ( // тут мои полномочия всё

              <TableRow key={row[id]}
                        component={"tr"}
                        style={row[value] === '-' && hiddenUnusedKPK ? {display: 'none'} : {}}
                        className={
                          row[value] !== '-' && colsHead === 'Услуга'
                            ? classes.clickable
                            : ''
                        }
                        onClick={
                          row[value] !== '-' && colsHead === 'Услуга'
                            ? () => {
                              requestKPKChild(orgOid, period, periodType, row[id])
                            }
                            : () => {
                            }
                        }>
                <TableCell component='th' scope='row' className={classes.cell}>{
                  row[colsHead]
                }</TableCell>
                <LightTooltip
                  placement='right'
                  title={row[value] !== '-'
                    ? <div className={`${classes.blackColor}`} style={{}}>
                      {`${row[value]} состоит из:`}
                      {randomValuesArrs.map((arr: any, i: number) => (
                        <span
                          className={`${classes[arr[1] > 98 ? 'greenColor' : 'redColor']} ${classes.tableHead}`}
                          key={i}
                        >{arr[0]}: {arr[1]}
                            </span>
                      ))}
                    </div>
                    : ''
                  }>
                  <TableCell className={`${classes.cell} ${classes.rightColumn}`}>{
                    row[value]
                  }</TableCell>
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
