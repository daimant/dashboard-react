import React, {MouseEvent, useState} from 'react';
import Logo from '../../Assets/Logo.svg';
import OwnerAvatar from '../../Assets/281586995103035.jpg';
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
  selectOrgMapListOSK,
  selectOrgMapListRZD,
  selectOrgOid,
  selectPeriod,
  selectPeriodNameMapList,
  selectPeriodType,
  selectShowFilters
} from '../../Redux/selectors';
import cn from 'classnames';
import {LightTooltip} from '../Widgets/KPKTable/KPKTable';
import {NavLink} from 'react-router-dom';
import {MapListType} from "../../Types/Types";

type MapStatePropsType = {
  showFilters: boolean
  orgOid: string
  period: string
  periodType: string
  namesListOSK: MapListType
  namesListRZD: MapListType
  periodNameMapList: MapListType
  isFetchingFilters: boolean
}

type MapDispatchPropsType = {
  setShowFilters: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

export const defPath = '/kpe';

const options = [
  {name: 'Ключевые показатели эффективности', path: defPath},
  {name: 'Рейтинг сотрудников', path: '/reyting-sotrudnikov'},
  {name: 'Статистика по объектам обслуживания', path: '/statistika-oo'},
];

const GetShortOrgMane = (list: any, oid: string) =>
  list
    .get(oid)
    .replace(/Региональный центр сервиса/, 'РЦС')
    .replace(/Территориальное управление технической поддержки/, 'ТУТП')
    .replace(/Отдел поддержки пользователей/, 'ОТП')
    .replace(/Отдел технической поддержки/, 'ОТП');

const Navbar = ({
                  setShowFilters, orgOid, period, periodType, namesListOSK, namesListRZD, periodNameMapList,
                  isFetchingFilters
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

  let shortNameOrg;

  if (namesListRZD.has(orgOid)) {
    shortNameOrg = GetShortOrgMane(namesListRZD, orgOid)
  } else if (namesListOSK.has(orgOid)) {
    shortNameOrg = GetShortOrgMane(namesListOSK, orgOid)
  } else {
    shortNameOrg = localStorage.getItem('orgName');
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.leftNav}>
        <NavLink to={defPath}>
          <img src={Logo}
               loading='lazy'
               alt='логотип оск'
               className={cn(classes.logo, classes.clickable)}/>
        </NavLink>
        <img src={FilterIcon}
             loading='lazy'
             alt='иконка фильтра'
             className={classes.clickable}
             onClick={changeShowFilters}/>
        {isFetchingFilters
          ? <Preloader/>
          : <div className={classes.aboutFilters}>
            <p>Организация: {shortNameOrg}</p>
            <p>Период: {periodNameMapList.get(`${periodType}:${period}`)}</p>
          </div>}
        <a target='blank' href='http://10.248.40.231:3000/profile?id=281586995103035'>
          <LightTooltip placement='right'
                        title={<div className={classes.bigImgContainer}>
                          <p>
                            Фролова Екатерина Викторовна
                          </p>
                          <img className={classes.bigImg}
                               src={OwnerAvatar}
                               alt='фотография руководителя подразделения'/>
                        </div>}>
            <img src={OwnerAvatar}
                 alt=''
                 loading='lazy'
                 className={cn(classes.clickable, classes.ownerAvatar)}/>
          </LightTooltip>
        </a>
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

const mapState = (state: RootStateType) => ({
  showFilters: selectShowFilters(state),
  orgOid: selectOrgOid(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  namesListOSK: selectOrgMapListOSK(state),
  namesListRZD: selectOrgMapListRZD(state),
  periodNameMapList: selectPeriodNameMapList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
});

const mapDispatch = {
  setShowFilters,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Navbar);


