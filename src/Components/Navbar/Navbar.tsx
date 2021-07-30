import React, {MouseEvent, useState} from 'react';
import Logo from '../../Assets/img/oskRZDLogo.png'
import classes from './Navbar.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {Preloader} from '../Common/Preloader/Preloader';
import FilterIcon from '../../Assets/Icons/FilterIcon.svg';

type PropsType = {
  showFilters: boolean
  orgOid: string
  period: string
  periodType: string
  orgMapList: Map<string, string>
  periodNameMapList: Map<string, string>
  isFetchingFilters: boolean

  setShowFilters: () => void
}

const options = [
  'Ключевые показатели эффективности (текущий дашборд)',
  'Рейтинг сотрудников',
  'Статистика по объектам обслуживания'
];

const Navbar = ({
                  setShowFilters, orgOid, period, periodType, orgMapList, periodNameMapList, isFetchingFilters, /*showFilters,*/
                }: PropsType) => {

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
  const shortNameOrg = orgMapList.has(orgOid)
    // @ts-ignore хз как ему это объяснить
    ? orgMapList
      .get(orgOid)
      .replace(/Региональный центр сервиса/, 'РЦС')
      .replace(/Территориальное управление технической поддержки/, 'ТУТП')
      .replace(/Отдел поддержки пользователей/, 'ОТП')
      .replace(/Отдел технической поддержки/, 'ОТП')
    : localStorage.getItem('orgName');

  return (
    <div className={classes.navbar}>
      <div className={classes.leftNav}>
        <img src={Logo} loading='lazy' alt=''/>
        <img src={FilterIcon} loading='lazy' alt='' className={classes.filterIcon} onClick={changeShowFilters}/>
        {isFetchingFilters
          ? <Preloader/>
          : <div className={classes.aboutFilters}>
            <p>Организация: {shortNameOrg}</p>
            <p>Период: {periodNameMapList.get(`${periodType}:${period}`)}</p>
          </div>}
      </div>
      <div className={classes.generalTitle}>
        <h1>Ключевые показатели эффективности</h1>
      </div>
      <div>
        <span>Пользователь</span>
        <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={handleClick}
          href={''}>
          <MenuIcon component={'svg'}/>
        </IconButton>
        <Menu
          id='long-menu'
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose} button={true} component={'li'}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
};

export default Navbar;


