import React, {MouseEvent, useState} from 'react';
import Logo from '../../Assets/Logo.svg'
import classes from './Navbar.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {Preloader} from '../Common/Preloader/Preloader';
import FilterIcon from '../../Assets/FilterIcon.svg';
import {connect} from 'react-redux';
import {RootStateType} from '../../Redux/store';
import {setShowFilters} from '../../Redux/filters';
import {
  selectIsFetchingFilters,
  selectIsOrgRZD,
  selectOrgMapListOSK,
  selectOrgMapListRZD,
  selectOrgOid,
  selectPeriod,
  selectPeriodNameMapList,
  selectPeriodType,
  selectShowFilters
} from '../../Redux/selectors';

const options = [
  'Ключевые показатели эффективности (текущий дашборд)',
  'Рейтинг сотрудников',
  'Статистика по объектам обслуживания'
];

type MapStatePropsType = {
  showFilters: boolean
  orgOid: string
  period: string
  periodType: string
  orgMapListOSK: Map<string, string>
  orgMapListRZD: Map<string, string>
  periodNameMapList: Map<string, string>
  isFetchingFilters: boolean
  isOrgRZD: boolean
}

type MapDispatchPropsType = {
  setShowFilters: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Navbar = ({
                  setShowFilters, orgOid, period, periodType, orgMapListOSK, orgMapListRZD, periodNameMapList,
                  isFetchingFilters, isOrgRZD, /*showFilters,*/
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
  const currMapList = isOrgRZD ? orgMapListRZD : orgMapListOSK;
  const shortNameOrg = currMapList.has(orgOid) // @ts-ignore он олень
    ? currMapList
      .get(orgOid)
      .replace(/Региональный центр сервиса/, 'РЦС')
      .replace(/Территориальное управление технической поддержки/, 'ТУТП')
      .replace(/Отдел поддержки пользователей/, 'ОТП')
      .replace(/Отдел технической поддержки/, 'ОТП')
    : localStorage.getItem('orgName');

  return (
    <div className={classes.navbar}>
      <div className={classes.leftNav}>
        <img src={Logo} loading='lazy' alt='' className={classes.logo}/>
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
            <MenuItem key={option}
                      selected={option === 'Pyxis'}
                      onClick={handleClose}
                      button={true}
                      component={'li'}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
};

const mapState = (state: RootStateType) => ({
  showFilters: selectShowFilters(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  orgMapListOSK: selectOrgMapListOSK(state),
  orgMapListRZD: selectOrgMapListRZD(state),
  periodNameMapList: selectPeriodNameMapList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  isOrgRZD: selectIsOrgRZD(state)
});

const mapDispatch = {
  setShowFilters
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Navbar);


