import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import Checkbox from '@material-ui/core/Checkbox';


interface Props {
  title: string
}

const FilterCheckBox: React.FC<Props> = props => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" color="inherit" {...bindTrigger(popupState)} style={{minWidth: '150px'}}>
              {props.title}
            </Button>
            <Menu {...bindMenu(popupState)}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              ООО ОСК ИнфоТранс
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
};

export default FilterCheckBox;
