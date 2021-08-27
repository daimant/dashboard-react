import React, {useEffect, useState} from 'react';
import classes from './Filters.module.scss';
import {Preloader} from '../Common/Preloader/Preloader';
import MenuTreeList from './MenuTreeList/MenuTreeList';
import {Button} from '@material-ui/core';
import {FetchError} from '../Common/FetchError/FetchError';
import {
  KTLType,
  OrgListOSKType,
  OrgListRZDType,
  PeriodListType,
  RequestWidgetsFromFiltersType,
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
  selectServiceOid,
  selectShowFilters,
  selectWorkers,
} from '../../Redux/selectors';
import {connect} from 'react-redux';
import {
  requestOrg,
  requestSetFiltersDefault,
  requestWidgetsFromFilters,
  setOrgOid,
  setPeriod
} from '../../Redux/filters';
import MenuTreeChkBox from './MenuTreeChkBox/MenuTreeChkBox';
import MenuChkBox from "./MenuChkBox/MenuChkBox";

type MapStatePropsType = {
  orgListOSK: OrgListOSKType
  altOrgListOSK: OrgListOSKType
  orgMapListOSK: Map<string, string>
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
};

type MapDispatchPropsType = {
  requestOrg: () => void
  requestWidgetsFromFilters: ({orgOid, period, periodType, ktl}: RequestWidgetsFromFiltersType) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Filters = ({
                   orgListOSK, altOrgListOSK, orgListRZD, isFetchingFilters, isFetchingWidgets, orgOid,
                   requestWidgetsFromFilters, setPeriod, setOrgOid, perList, period, periodType,
                   requestSetFiltersDefault, showFilters, requestOrg, serviceOid, ktl, workers
                 }: PropsType) => {

  useEffect(() => {
    if (!orgListOSK.oid) {
      requestOrg()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedKTL, setSelectedKTL] = useState<number[]>([]);

  if (!showFilters) return null;
  if (isFetchingFilters) return <Preloader/>;

  const acceptFilters = (type: string = 'def', selected: any = '') => {
    const [newPeriodType, newPeriod] = (type === 'период')
      ? selected.split(':')
      : ['', ''];
    const parentsKTL = new Set(ktl.map(el => el.oid));

    if (type === 'договора') {
      selected = selected
        .filter((el: any) => !parentsKTL.has(el))
        .map((el: string) => Number(el));
      setSelectedKTL(selected)
    }

    requestWidgetsFromFilters({
      orgOid: type === 'оргструктура' ? selected : orgOid,
      period: type === 'период' ? newPeriod : period,
      periodType: type === 'период' ? newPeriodType : periodType,
      ktl: type === 'договора' ? selected : selectedKTL,
    });
  };

  return (
    <div className={classes.filters}>
      {(!orgListOSK || !orgListOSK.oid)
        ? <FetchError/>
        : <>
          <MenuTreeList treeList={orgListOSK}
                        altOrgListOSK={altOrgListOSK}
                        orgListRZD={orgListRZD}
                        title={'оргструктура'}
                        setter={setOrgOid}
                        orgOid={orgOid}
                        acceptFilters={acceptFilters}
                        blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          <MenuTreeList treeList={perList}
                        title={'период'}
                        setter={setPeriod}
                        period={period}
                        periodType={periodType}
                        acceptFilters={acceptFilters}
                        blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          <MenuTreeChkBox treeList={ktl}
                          title={'договора'}
                          acceptFilters={acceptFilters}
                          blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          {/*{console.log(workers)}*/}
          <MenuChkBox workersList={workers}
                      title={'договора'}
                      acceptFilters={acceptFilters}
                      blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          {console.log(workers)}
        </>}
      <Button variant='outlined'
              onClick={requestSetFiltersDefault}
              disabled={isFetchingWidgets}
              href=''>
        сбросить фильтры
      </Button>
    </div>
  )
};

const mapState = (state: RootStateType) => ({
  orgListOSK: selectOrgListOSK(state),
  altOrgListOSK: selectAltOrgListOSK(state),
  orgMapListOSK: selectOrgMapListOSK(state),
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
});

const mapDispatch = {
  requestOrg,
  requestWidgetsFromFilters,
  setPeriod,
  setOrgOid,
  requestSetFiltersDefault,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Filters);
