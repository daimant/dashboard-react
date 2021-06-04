import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from "./KPKTable.module.scss";
// import {KPKTablePropsElements} from "../../Common/Types";
import CloseIcon from '@material-ui/icons/Close';
import {Preloader} from "../../Common/Preloader/Preloader";

const KPKTable: React.FC<any> = ({kpk, requestKPKChild, removeKPKChild, orgOid, period, periodType}) => {
  const {cols, data: rows} = kpk;

  if (!rows.length) return <Preloader/>;

  const colsHead = cols[1];
  const closeService = () => {
    removeKPKChild();
  };
  const openService = (event: any) => {
    requestKPKChild(orgOid, period, periodType, event, kpk);
  };

  return (
    <div className={classes.kpkTable}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small" stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>{colsHead === 'Услуга'
                ? colsHead
                : <span className={classes.tableHead}>
                  <CloseIcon fontSize='small' onClick={closeService}/>
                  {colsHead}
                </span>
              }</TableCell>
              <TableCell align="right" className={classes.cell}>{cols[2]}</TableCell>
              {/*<TableCell align="right" className={classes.cell}>{cols[3]}</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row[cols[0]]}
                        className={
                          row[cols[2]] !== '-' && colsHead === 'Услуга'
                            ? classes.clickableRow
                            : ''
                        }
                        onClick={
                          row[cols[2]] !== '-' && colsHead === 'Услуга'
                            ? () => {
                              openService(row[cols[0]])
                            }
                            : () => {
                            }
                        }>
                <TableCell component="th" scope="row" className={classes.cell}>{
                  row[cols[1]]
                }</TableCell>
                <TableCell align="right" className={classes.cell}>{
                  row[cols[2]]
                }</TableCell>
                {/*<TableCell align="right" className={classes.cell}>{*/}
                {/*  // @ts-ignore*/}
                {/*  row[cols[3]]*/}
                {/*}</TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default KPKTable;
