import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Checkbox from '@material-ui/core/Checkbox';


interface Props {}

const FilterCheckBox: React.FC<Props> = props => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            Open Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}/>
            <MenuItem onClick={popupState.close}>Cake</MenuItem>
            <MenuItem onClick={popupState.close}>Death</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default FilterCheckBox;
