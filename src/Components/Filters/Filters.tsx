import React, {useEffect} from 'react';
import classes from './Filters.module.scss';
import {Preloader} from '../Common/Preloader/Preloader';
import MenuTreeList from './MenuTreeList/MenuTreeList';
import {Button} from '@material-ui/core';
import {FetchError} from '../Common/FetchError/FetchError';
import {
  OrgListOSKType,
  OrgListRZDType,
  PeriodListType
} from '../../Types/Types';
import {RootStateType} from '../../Redux/store';
import {
  selectAltOrgListOSK,
  selectIsFetchingFilters,
  selectIsFetchingWidgets,
  selectIsOrgRZD,
  selectOrgListOSK,
  selectOrgListRZD,
  selectOrgMapListOSK,
  selectOrgOid,
  selectPeriod,
  selectPeriodType,
  selectPerList,
  selectServiceOid,
  selectShowFilters,
} from '../../Redux/selectors';
import {connect} from 'react-redux';
import {
  requestOrg,
  requestSetFiltersDefault,
  requestWidgetsFromFilters,
  setIsOrgRZD,
  setOrgOid,
  setPeriod
} from '../../Redux/filters';

type MapStatePropsType = {
  orgListOSK: OrgListOSKType
  altOrgListOSK: OrgListOSKType
  orgMapListOSK: Map<string, string>
  orgListRZD: OrgListRZDType
  isFetchingFilters: boolean
  isFetchingWidgets: boolean
  orgOid: string
  perList: PeriodListType
  period: string
  periodType: string
  showFilters: boolean
  serviceOid: string
  isOrgRZD: boolean
};

type MapDispatchPropsType = {
  requestOrg: () => void
  requestWidgetsFromFilters: (oid: string, period: string, periodType: string, isOrgRZD: boolean) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
  setIsOrgRZD: (isOrgRZD: boolean) => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Filters = ({
                   orgListOSK, altOrgListOSK, orgListRZD, isFetchingFilters, isFetchingWidgets, orgOid,
                   requestWidgetsFromFilters, setPeriod, setOrgOid, perList, period, periodType,
                   requestSetFiltersDefault, showFilters, isOrgRZD, setIsOrgRZD, requestOrg, orgMapListOSK,
                   serviceOid, /*ktl, val,*/
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
    const [newPeriodType, newPeriod] = (type === 'период') ? selected.split(':') : ['', ''];
    let newIsOrgRZD = isOrgRZD;

    if (type !== 'период') {
      if ((newIsOrgRZD && orgMapListOSK.has(selected)) || (!newIsOrgRZD && !orgMapListOSK.has(selected))) {
        setIsOrgRZD(newIsOrgRZD);
        newIsOrgRZD = !newIsOrgRZD;
        localStorage.setItem('isOrgRZD', `${newIsOrgRZD}`)
      }
    }
    requestWidgetsFromFilters(
      type === 'оргструктура' ? selected : orgOid,
      type === 'период' ? newPeriod : period,
      type === 'период' ? newPeriodType : periodType,
      newIsOrgRZD
    );
  };

  return (
    <div className={classes.filters}>
      {(!orgListOSK || !orgListOSK.oid)
        ? <FetchError/>
        : <><MenuTreeList treeList={orgListOSK}
                          altOrgListOSK={altOrgListOSK}
                          orgListRZD={orgListRZD}
                          title={'оргструктура'}
                          setter={setOrgOid}
                          orgOid={orgOid}
                          period={period}
                          periodType={periodType}
                          acceptFilters={acceptFilters}
                          blockedButton={(isFetchingWidgets || serviceOid !== '0')}/>
          <MenuTreeList treeList={perList}
                        altOrgListOSK={{}}
                        orgListRZD={{}}
                        title={'период'}
                        orgOid={orgOid}
                        setter={setPeriod}
                        period={period}
                        periodType={periodType}
                        acceptFilters={acceptFilters}
                        blockedButton={(isFetchingWidgets || serviceOid !== '0')}/></>
      }
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
  isOrgRZD: selectIsOrgRZD(state)
  // ktl: selectKTL(state),
  // val: selectVal(state),
});

const mapDispatch = {
  requestOrg,
  requestWidgetsFromFilters,
  setPeriod,
  setOrgOid,
  requestSetFiltersDefault,
  setIsOrgRZD,
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, mapDispatch)(Filters);
