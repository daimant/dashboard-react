import React, {useEffect, /*SyntheticEvent*/} from 'react';
import classes from './Filters.module.scss';
import {Preloader} from '../Common/Preloader/Preloader';
import MenuTreeList from './MenuTreeList/MenuTreeList';
import {Button, /*makeStyles*/} from '@material-ui/core';
import {FetchError} from '../Common/FetchError/FetchError';
import {
  KTLType,
  MapListType,
  OrgListOSKType,
  OrgListRZDType,
  PeriodListType,
  RequestWidgetsFromFiltersType,
  SelectedKTLType,
  SelectedWorkersType,
  WorkersType
} from '../../Types/Types';
import {RootStateType} from '../../Redux/store';
import {
  selectAltOrgListOSK,
  selectIsFetchingFilters,
  selectIsFetchingWidgets,
  selectKTL,
  selectOrgListOSK,
  selectOrgListRZD,
  selectOrgMapListOSK,
  selectOrgOid,
  selectPeriod,
  selectPeriodType,
  selectPerList,
  selectSelectedKTL,
  selectSelectedWorkers,
  selectServiceOid,
  selectShowFilters,
  selectWorkers,
  selectSwitchSDAWHIT,
  selectOrgMapListRZD,
  selectPeriodNameMapList,
} from '../../Redux/selectors';
import {connect} from 'react-redux';
import {
  requestOrg,
  requestSetFiltersDefault,
  requestWidgetsFromFilters,
  setOrgOid,
  setPeriod,
} from '../../Redux/filters';
import MenuKTL from './MenuKTL/MenuKTL';
import MenuWorkers from './MenuWorkers/MenuWorkers';
import {setDefPeriod, setSelectedKTL, setSelectedWorkers, setSwitchSDAWHIT} from '../../Redux/filters/actions';
// import cn from 'classnames';
// import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
// import Switch from '@material-ui/core/Switch/Switch';
// import UndefinedAccIcon from "../../Assets/UndefinedAccIcon.svg";

type MapStatePropsType = {
  orgListOSK: OrgListOSKType
  altOrgListOSK: OrgListOSKType
  namesListOSK: MapListType
  orgListRZD: OrgListRZDType
  isFetchingFilters: boolean
  isFetchingWidgets: boolean
  orgOid: string
  perList: PeriodListType[]
  period: string
  periodType: string
  showFilters: boolean
  serviceOid: string
  ktl: KTLType[]
  workers: WorkersType[]
  selectedKTL: SelectedKTLType
  selectedWorkers: SelectedWorkersType
  switchSDAWHIT: boolean
  namesListRZD: MapListType
  periodNameMapList: MapListType
};

type MapDispatchPropsType = {
  requestOrg: () => void
  requestWidgetsFromFilters: ({orgOid, period, periodType, selectedKTL, selectedWorkers}: RequestWidgetsFromFiltersType) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
  setSelectedKTL: (selectedKTL: SelectedKTLType) => void
  setSelectedWorkers: (selectedWorkers: SelectedWorkersType) => void
  setSwitchSDAWHIT: () => void
  setDefPeriod: () => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

// const useStyles = makeStyles(() => ({
//     toggle: {
//       '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: '#e21a1a',
//       },
//     },
//   })
// );

const GetShortOrgMane = (list: any, oid: string) =>
  list
    .get(oid)
    .replace(/Региональный центр сервиса/, 'РЦС')
    .replace(/Территориальное управление технической поддержки/, 'ТУТП')
    .replace(/Отдел поддержки пользователей/, 'ОТП')
    .replace(/Отдел технической поддержки/, 'ОТП');

const Filters = ({
                   orgListOSK, altOrgListOSK, orgListRZD, isFetchingFilters, isFetchingWidgets, orgOid,
                   requestWidgetsFromFilters, setPeriod, setOrgOid, perList, period, periodType,
                   requestSetFiltersDefault, showFilters, requestOrg, /*serviceOid,*/ ktl, workers, selectedKTL,
                   selectedWorkers, setSelectedKTL, setSelectedWorkers, switchSDAWHIT, /*setSwitchSDAWHIT,*/ namesListRZD,
                   /*setDefPeriod,*/ namesListOSK, periodNameMapList
                 }: PropsType) => {

  useEffect(() => {
    if (!orgListOSK.oid) {
      requestOrg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const classesMUI = useStyles();

  if (!showFilters) return null;
  if (isFetchingFilters) return <Preloader/>;


  const acceptFilters = (type: string = 'def', selected: any = '') => {
    const [newPeriodType, newPeriod] = (type === 'период')
      ? selected.split(':')
      : ['', ''];

    requestWidgetsFromFilters({
      orgOid: type === 'оргструктура' ? selected : orgOid,
      period: type === 'период' ? newPeriod : period,
      periodType: type === 'период' ? newPeriodType : periodType,
      selectedKTL: type === 'договор' ? selected : selectedKTL,
      selectedWorkers: type === 'персонал' ? selected : selectedWorkers,
    });
  };

  const filtersDownloadError = !orgListOSK || !orgListOSK.oid || !orgListRZD || !orgListRZD.children.length
    || !ktl || !ktl.length || !workers || !workers.length;

  let shortNameOrg;

  if (namesListRZD.has(orgOid)) {
    shortNameOrg = GetShortOrgMane(namesListRZD, orgOid)
  } else if (namesListOSK.has(orgOid)) {
    shortNameOrg = GetShortOrgMane(namesListOSK, orgOid)
  } else {
    shortNameOrg = localStorage.getItem('orgName');
  }

  // const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
  //   const target = e.target as HTMLImageElement;
  //   target.onerror = null;
  //   target.src = UndefinedAccIcon;
  // };

  return (
    <div className={classes.filters}>
      {filtersDownloadError
        ? <FetchError description={'Ошибка при загрузке фильтров'}/>
        : <>
          {/*<div className={cn(classes.clickable, classes.unselectable)}>{*/}
          {/*  <FormControlLabel control={<Switch size='medium'*/}
          {/*                                     checked={switchSDAWHIT}*/}
          {/*                                     disabled={(isFetchingWidgets || serviceOid !== '0')}*/}
          {/*                                     onChange={() => {*/}
          {/*                                       localStorage.setItem('switchSDAWHIT', `${!switchSDAWHIT}`);*/}
          {/*                                       setSwitchSDAWHIT();*/}
          {/*                                       if (!switchSDAWHIT && !namesListRZD.has(orgOid)) {*/}
          {/*                                         setOrgOid('0');*/}
          {/*                                       }*/}
          {/*                                       if (!switchSDAWHIT && periodType !== 'm') {*/}
          {/*                                         setDefPeriod();*/}
          {/*                                       }*/}
          {/*                                     }}*/}
          {/*                                     color='default'*/}
          {/*                                     className={classesMUI.toggle}/>}*/}
          {/*                    labelPlacement='start'*/}
          {/*                    label={<span className={cn(classes.textAroundSwitcher, classes.tableHead)}>*/}
          {/*                SD / АИХ*/}
          {/*              </span>}*/}
          {/*  />*/}
          {/*}</div>*/}
          <MenuTreeList treeList={orgListOSK}
                        altOrgListOSK={altOrgListOSK}
                        orgListRZD={orgListRZD}
                        title={'оргструктура'}
                        setter={setOrgOid}
                        orgOid={orgOid}
                        acceptFilters={acceptFilters}
                        blockedButton={(isFetchingWidgets)}
                        switchSDAWHIT={switchSDAWHIT}
                        selectedFilter={shortNameOrg}/>
          <MenuTreeList treeList={perList}
                        title={'период'}
                        setter={setPeriod}
                        period={period}
                        periodType={periodType}
                        acceptFilters={acceptFilters}
                        blockedButton={(isFetchingWidgets)}
                        switchSDAWHIT={switchSDAWHIT}
                        selectedFilter={periodNameMapList.get(`${periodType}:${period}`)!}/>
          <MenuKTL ktl={ktl}
                   title={'договор'}
                   acceptFilters={acceptFilters}
                   selectedKTL={selectedKTL}
                   setSelectedKTL={setSelectedKTL}
                   blockedButton={(isFetchingWidgets)}/>
          <MenuWorkers workersList={workers}
                       title={'первая линия / разъездной персонал'}
                       acceptFilters={acceptFilters}
                       selectedWorkers={selectedWorkers}
                       setSelectedWorkers={setSelectedWorkers}
                       blockedButton={(isFetchingWidgets)}/>
          <div>
            <Button variant='outlined'
                    onClick={requestSetFiltersDefault}
                    disabled={isFetchingWidgets}
                    href=''>
              сбросить фильтры
            </Button>
            {/*{isFetchingFilters*/}
            {/*  ? <Preloader/>*/}
            {/*  : <div className={classes.aboutFilters}>*/}
            {/*    <p>Организация: {shortNameOrg}</p>*/}
            {/*    <p>Период: {periodNameMapList.get(`${periodType}:${period}`)}</p>*/}
            {/*  </div>}*/}
            {/*{orgOwner.fio && <a target='blank'*/}
            {/*                    href={orgOwner.link_card}>*/}
            {/*    <LightTooltip placement='right'*/}
            {/*                  title={<div className={classes.bigImgContainer}>*/}
            {/*                    <p>*/}
            {/*                      {orgOwner.fio}*/}
            {/*                    </p>*/}
            {/*                    <img className={classes.bigImg}*/}
            {/*                         src={orgOwner.avatar}*/}
            {/*                         alt=''*/}
            {/*                         loading='lazy'*/}
            {/*                         onError={handleError}/>*/}
            {/*                  </div>}>*/}
            {/*        <img className={cn(classes.clickable, classes.ownerAvatar)}*/}
            {/*             src={orgOwner.ico || UndefinedAccIcon}*/}
            {/*             alt=''*/}
            {/*             loading='lazy'*/}
            {/*             onError={handleError}/>*/}
            {/*    </LightTooltip>*/}
            {/*</a>}*/}
          </div>
        </>}
    </div>
  )
};

const mapState = (state: RootStateType) => ({
  orgListOSK: selectOrgListOSK(state),
  altOrgListOSK: selectAltOrgListOSK(state),
  namesListOSK: selectOrgMapListOSK(state),
  orgListRZD: selectOrgListRZD(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  perList: selectPerList(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  showFilters: selectShowFilters(state),
  serviceOid: selectServiceOid(state),
  ktl: selectKTL(state),
  workers: selectWorkers(state),
  selectedKTL: selectSelectedKTL(state),
  selectedWorkers: selectSelectedWorkers(state),
  switchSDAWHIT: selectSwitchSDAWHIT(state),
  namesListRZD: selectOrgMapListRZD(state),
  periodNameMapList: selectPeriodNameMapList(state)
});

const mapDispatch = {
  requestOrg,
  requestWidgetsFromFilters,
  setPeriod,
  setOrgOid,
  requestSetFiltersDefault,
  setSelectedKTL,
  setSelectedWorkers,
  setSwitchSDAWHIT,
  setDefPeriod,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Filters);
