import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Filters from './Filters';
import {
  requestOrg, requestWidgetsFromFilters, requestSetFiltersDefault, setOrgOid, setPeriod, setIsOrgRZD
} from '../../Redux/filters-reducer';
import {
  selectIsFetchingFilters, selectOrgOid, selectPeriod, selectPeriodType, selectPerList,
  selectShowFilters, selectIsFetchingWidgets, selectOrgListRZD, selectAltOrgListOSK, selectOrgListOSK, selectIsOrgRZD, /*selectVal, selectKTL,*/
} from '../../Redux/selectors';
import {RootStateType} from '../../Redux/store';
import {OrgListOSKType, OrgListRZDType, PeriodListType} from '../../Types/Types';

type MapStatePropsType = {
  orgListOSK: OrgListOSKType
  altOrgListOSK: OrgListOSKType
  orgListRZD: OrgListRZDType
  isFetchingFilters: boolean
  isFetchingWidgets: boolean
  orgOid: string
  perList: PeriodListType
  period: string
  periodType: string
  showFilters: boolean
  isOrgRZD: boolean
}
type MapDispatchPropsType = {
  requestOrg: () => void
  requestWidgetsFromFilters: (oid: string, period: string, periodType: string, isOrgRZD: boolean) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
  setIsOrgRZD: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const FiltersContainer = ({
                            orgListOSK, altOrgListOSK, orgListRZD, isFetchingFilters, isFetchingWidgets, orgOid,
                            perList, period, periodType, showFilters, requestOrg, requestWidgetsFromFilters, setPeriod,
                            setOrgOid, requestSetFiltersDefault, isOrgRZD, setIsOrgRZD
                          }: PropsType) => {
  useEffect(() => {
    if (!orgListOSK.oid)
      requestOrg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Filters
      orgListOSK={orgListOSK}
      altOrgListOSK={altOrgListOSK}
      orgListRZD={orgListRZD}
      isFetchingFilters={isFetchingFilters}
      isFetchingWidgets={isFetchingWidgets}
      orgOid={orgOid}
      perList={perList}
      period={period}
      periodType={periodType}
      showFilters={showFilters}
      isOrgRZD={isOrgRZD}
      // ktl={ktl}
      // val={val}

      requestWidgetsFromFilters={requestWidgetsFromFilters}
      setPeriod={setPeriod}
      setOrgOid={setOrgOid}
      requestSetFiltersDefault={requestSetFiltersDefault}
      setIsOrgRZD={setIsOrgRZD}
    />
  )
};

const mapState = (state: RootStateType) => ({
  orgListOSK: selectOrgListOSK(state),
  altOrgListOSK: selectAltOrgListOSK(state),
  orgListRZD: selectOrgListRZD(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  perList: selectPerList(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  showFilters: selectShowFilters(state),
  isOrgRZD: selectIsOrgRZD(state)
  // ktl: selectKTL(state),
  // val: selectVal(state),
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, {
  requestOrg, requestWidgetsFromFilters, setPeriod, setOrgOid, requestSetFiltersDefault, setIsOrgRZD
})(FiltersContainer);
