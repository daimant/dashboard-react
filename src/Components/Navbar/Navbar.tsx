import React, {MouseEvent, useState} from 'react';
import Logo from '../../Assets/Logo.svg';
import classes from './Navbar.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import FilterIcon from '../../Assets/FilterIcon.svg';
import {connect} from 'react-redux';
import {RootStateType} from '../../Redux/store';
import {setShowFilters} from '../../Redux/filters';
import cn from 'classnames';
import {NavLink} from 'react-router-dom';

type MapStatePropsType = {}

type MapDispatchPropsType = {
  setShowFilters: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

export const defPath = '/kpi';

const options = [
  {name: 'Ключевые показатели эффективности', path: defPath},
  {name: 'Рейтинг сотрудников', path: '/reyting-sotrudnikov'},
  {name: 'Статистика по объектам обслуживания', path: '/statistika-oo'},
];

const Navbar = ({setShowFilters}: PropsType) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeShowFilters = () => {
    setShowFilters();
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.leftNav}>
        <NavLink to={defPath}>
          <img className={cn(classes.logo, classes.clickable)}
               src={Logo}
               alt=''
               loading='lazy'/>
        </NavLink>
        <img className={classes.clickable}
             src={FilterIcon}
             alt=''
             loading='lazy'
             onClick={changeShowFilters}/>
      </div>
      <div className={classes.generalTitle}>
        <h1>Ключевые показатели эффективности</h1>
      </div>
      <div>
        <span style={{opacity: 0}}>Пользователь</span>
        <IconButton aria-label='more'
                    aria-controls='long-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                    href=''>
          <MenuIcon component={'svg'}/>
        </IconButton>
        <Menu id='long-menu'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem key={option.name}
                      selected={option.name === 'Pyxis'}
                      onClick={handleClose}
                      button={true}
                      component={NavLink}
                      to={option.path}>
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
};

const mapState = () => ({});

const mapDispatch = {
  setShowFilters,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Navbar);


