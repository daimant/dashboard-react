import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: '15vw',
      maxWidth: '15vw',
    },
    formContainer: {
      marginTop: '1.3rem',
    },
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
  }),
);
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      maxWidth: 500,
    },
  },
};

const MenuMulChBox: React.FC<any> = props => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([props.data[0]]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <div className={classes.formContainer}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label" shrink={true}>{props.title}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input/>}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {props.data.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1}/>
              <ListItemText primary={name}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MenuMulChBox;
