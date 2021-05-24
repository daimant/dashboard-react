import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from "./KPKTable.module.scss";
import {KPKTablePropsElements} from "../../Common/Types";

const KPKTable: React.FC<KPKTablePropsElements> = ({kpk}) => {
  const {cols, data: rows} = kpk;

  return (
    <div className={classes.kpkTable}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small" aria-label="a dense table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>{cols[1]}</TableCell>
              <TableCell align="right" className={classes.cell}>{cols[2]}</TableCell>
              <TableCell align="right" className={classes.cell}>{cols[3]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              // @ts-ignore
              <TableRow key={row[cols[1]]}>
                <TableCell component="th" scope="row" className={classes.cell}>{
                  // @ts-ignore
                  row[cols[1]]
                }</TableCell>
                <TableCell align="right" className={classes.cell}>{
                  // @ts-ignore
                  row[cols[2]]
                }</TableCell>
                <TableCell align="right" className={classes.cell}>{
                  // @ts-ignore
                  row[cols[3]]
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
