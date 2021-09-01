import React, {useEffect} from 'react';
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
} from '../../Redux/selectors';
import {connect} from 'react-redux';
import {
  requestOrg,
  requestSetFiltersDefault,
  requestWidgetsFromFilters,
  setOrgOid,
  setPeriod
} from '../../Redux/filters';
import MenuKTL from './MenuKTL/MenuKTL';
import MenuWorkers from "./MenuWorkers/MenuWorkers";
import {setSelectedKTL, setSelectedWorkers} from "../../Redux/filters/actions";

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
  selectedKTL: SelectedKTLType
  selectedWorkers: SelectedWorkersType
};

type MapDispatchPropsType = {
  requestOrg: () => void
  requestWidgetsFromFilters: ({orgOid, period, periodType, selectedKTL, selectedWorkers}: RequestWidgetsFromFiltersType) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
  setSelectedKTL: (selectedKTL: SelectedKTLType) => void
  setSelectedWorkers: (selectedWorkers: SelectedWorkersType) => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Filters = ({
                   orgListOSK, altOrgListOSK, orgListRZD, isFetchingFilters, isFetchingWidgets, orgOid,
                   requestWidgetsFromFilters, setPeriod, setOrgOid, perList, period, periodType,
                   requestSetFiltersDefault, showFilters, requestOrg, serviceOid, ktl, workers, selectedKTL,
                   selectedWorkers, setSelectedKTL, setSelectedWorkers
                 }: PropsType) => {

  useEffect(() => {
    if (!orgListOSK.oid) {
      requestOrg()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className={classes.filters}>
      {filtersDownloadError
        ? <FetchError description={'Ошибка при загрузке фильтров'}/>
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
          <MenuKTL ktl={ktl}
                   title={'договор'}
                   acceptFilters={acceptFilters}
                   selectedKTL={selectedKTL}
                   setSelectedKTL={setSelectedKTL}
                   blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          <MenuWorkers workersList={workers}
                       title={'персонал'}
                       acceptFilters={acceptFilters}
                       selectedWorkers={selectedWorkers}
                       setSelectedWorkers={setSelectedWorkers}
                       blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          <Button variant='outlined'
                  onClick={requestSetFiltersDefault}
                  disabled={isFetchingWidgets}
                  href=''>
            сбросить фильтры
          </Button>
        </>}
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
  selectedKTL: selectSelectedKTL(state),
  selectedWorkers: selectSelectedWorkers(state),
});

const mapDispatch = {
  requestOrg,
  requestWidgetsFromFilters,
  setPeriod,
  setOrgOid,
  requestSetFiltersDefault,
  setSelectedKTL,
  setSelectedWorkers
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Filters);
