import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from "./KPKTable.module.scss";
import CloseIcon from '@material-ui/icons/Close';
import {Preloader} from "../../Common/Preloader/Preloader";
import Switch from "@material-ui/core/Switch/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const CheckedValueKPK: React.FC<any> = ({hidden, setHiddenUnusedKPK}) => {
  return (
    <span className={classes.clickable}>{
      <FormControlLabel
        control={<Switch size="medium" checked={hidden} onChange={() => setHiddenUnusedKPK(!hidden)} color="default"
        />}
        labelPlacement="start"
        label='скрыть пустые '
      />
    }</span>
  )
};

const KPKTable: React.FC<any> = ({requestKPKChild, removeKPKChild, orgOid, period, periodType, cols, rows}) => {
  const [hiddenUnusedKPK, setHiddenUnusedKPK] = React.useState(false);

  if (!cols.length) return <Preloader/>;
  const [id, colsHead, value] = cols;

  return (
    <div className={classes.kpkTable}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>
                {colsHead === 'Услуга' || colsHead === 'Ошибка при загрузке'
                  ? colsHead
                  : <span className={classes.tableHead}>
                      <CloseIcon fontSize='small' onClick={removeKPKChild}/>{colsHead}
                    </span>
                }
                <CheckedValueKPK hidden={hiddenUnusedKPK} setHiddenUnusedKPK={setHiddenUnusedKPK}/>
              </TableCell>
              <TableCell align="right" className={classes.cell}>{value}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row[id]}
                        style={row[value] === '-' && hiddenUnusedKPK ? {display: 'none'} : {}}
                        className={
                          row[value] !== '-' && colsHead === 'Услуга'
                            ? classes.clickable
                            : ''
                        }
                        onClick={
                          row[value] !== '-' && colsHead === 'Услуга'
                            ? () => {requestKPKChild(orgOid, period, periodType, row[id])}
                            : () => {}
                        }>
                <TableCell component="th" scope="row" className={classes.cell}>{
                  row[colsHead]
                }</TableCell>
                <TableCell align="right" className={classes.cell}>{
                  row[value]
                }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default KPKTable;
