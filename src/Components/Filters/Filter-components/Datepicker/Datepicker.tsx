import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {ru} from 'date-fns/locale'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface Props {
    title: string,
    date: any,
}

// @ts-ignore
const Datepicker: React.FC<Props> = ({title, date, setDate}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(date);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setDate(selectedDate, title)
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd MMMM yyyy"
            margin="normal"
            id={title}
            label={title}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Datepicker;
