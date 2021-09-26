import React, {MouseEvent, SyntheticEvent, useState} from 'react';
import Logo from '../../Assets/Logo.svg';
import classes from './Navbar.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {Preloader} from '../Common/Preloader/Preloader';
import FilterIcon from '../../Assets/FilterIcon.svg';
import UndefinedAccIcon from '../../Assets/UndefinedAccIcon.svg';
import {connect} from 'react-redux';
import {RootStateType} from '../../Redux/store';
import {setShowFilters} from '../../Redux/filters';
import {
  selectIsFetchingFilters,
  selectOrgMapListOSK,
  selectOrgMapListRZD,
  selectOrgOid,
  selectOrgOwner,
  selectPeriod,
  selectPeriodNameMapList,
  selectPeriodType,
  selectShowFilters
} from '../../Redux/selectors';
import cn from 'classnames';
import {LightTooltip} from '../Widgets/KPKTable/KPKTable';
import {NavLink} from 'react-router-dom';
import {MapListType, OrgOwnerType} from '../../Types/Types';

type MapStatePropsType = {
  showFilters: boolean
  orgOid: string
  period: string
  periodType: string
  namesListOSK: MapListType
  namesListRZD: MapListType
  periodNameMapList: MapListType
  isFetchingFilters: boolean
  orgOwner: OrgOwnerType
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
                  isFetchingFilters, orgOwner
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

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = UndefinedAccIcon;
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
        {isFetchingFilters
          ? <Preloader/>
          : <div className={classes.aboutFilters}>
            <p>Организация: {shortNameOrg}</p>
            <p>Период: {periodNameMapList.get(`${periodType}:${period}`)}</p>
          </div>}
        {orgOwner.fio && <a target='blank'
                            href={orgOwner.link_card}>
            <LightTooltip placement='right'
                          title={<div className={classes.bigImgContainer}>
                            <p>
                              {orgOwner.fio}
                            </p>
                            <img className={classes.bigImg}
                                 src={orgOwner.avatar}
                                 alt=''
                                 loading='lazy'
                                 onError={handleError}/>
                          </div>}>
                <img className={cn(classes.clickable, classes.ownerAvatar)}
                     src={orgOwner.ico || UndefinedAccIcon}
                     alt=''
                     loading='lazy'
                     onError={handleError}/>
            </LightTooltip>
        </a>}
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
  orgOwner: selectOrgOwner(state),
});

const mapDispatch = {
  setShowFilters,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Navbar);


