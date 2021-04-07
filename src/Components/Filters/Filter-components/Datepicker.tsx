import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface Props {}

const Datepicker: React.FC<Props> = props => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="With keyboard"
          format="dd MMMM yyyy"
          value={selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={date => handleDateChange(date)}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default Datepicker;
