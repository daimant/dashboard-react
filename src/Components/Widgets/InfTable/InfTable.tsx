import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from "./InfTable.module.scss";
import {InfTableProps} from "../../Common/Types";
import WidgetsTitle from "../WidgetsTitle/WidgetsTitle";

const InfTable: React.FC<InfTableProps> = ({inf: rows, widgetsTitle}) => {
  return (
    <div className={classes.infTable}>
      <WidgetsTitle widgetsTitle={widgetsTitle}/>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small" aria-label="a dense table" className={classes.table}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} >
                <TableCell component="th" scope="row" className={classes.cell}>
                  {row.name}
                </TableCell>
                <TableCell align="right" className={classes.cell}>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default InfTable;
