import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from "./TableRight.module.scss";

interface Props {
}

interface TableRightElement {
  name: string;
  value: string;
}

const rows: TableRightElement[] = [
  {name: 'Чистая прибыль', value: '100М'},
  {name: 'EBITDA', value: '100М'},
  {name: 'Удовлетворенность клиентов', value: '99%'},
  {name: 'Рентабельность', value: '100%'},
  {name: 'ROIC', value: '100%'},
  {name: 'Производительность труда', value: '100 K|P'},
  {name: 'KPI', value: '100%'},
];


const TableRight: React.FC<Props> = props => {
  return (
    <div className={classes.table_right}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table" style={{margin: '0 .5rem'}}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
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

export default TableRight;
