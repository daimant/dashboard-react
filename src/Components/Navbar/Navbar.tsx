import React from "react";
import logo from '../../Assets/img/osk_rzd_logo.png'
import classes from "./Navbar.module.scss";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
}

const options = [
  'Ключевые показатели эффективности (текущий дашборд)',
  'Рейтинг сотрудников',
  'Статистика по объектам обслуживания'
];

const Navbar: React.FC<Props> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.navbar}>
      <div>
        <img src={logo} loading='lazy' alt=""/>
      </div>
      <div>
        <h1>Ключевые показатели эффективности</h1>
      </div>
      <div>
        <span>Поморцев Сергей</span>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>

      </div>
    </div>
  )
};

export default Navbar;


