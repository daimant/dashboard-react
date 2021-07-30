import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Filters from './Filters';
import {
  requestOrg, requestWidgetsFromFilters, requestSetFiltersDefault, setOrgOid, setPeriod
} from '../../Redux/filters-reducer';
import {
  selectIsFetchingFilters, selectOrgList, selectOrgOid, selectPeriod, selectPeriodType, selectPerList,
  selectShowFilters, selectAltOrgList, selectIsFetchingWidgets, /*selectVal, selectKTL,*/
} from '../../Redux/selectors';
import {RootStateType} from '../../Redux/store';
import {OrgListType, PeriodListType} from '../../Types/Types';

type MapStatePropsType = {
  orgList: OrgListType
  altOrgList: OrgListType
  isFetchingFilters: boolean
  isFetchingWidgets: boolean
  orgOid: string
  perList: PeriodListType
  period: string
  periodType: string
  showFilters: boolean
}
type MapDispatchPropsType = {
  requestOrg: () => void
  requestWidgetsFromFilters: (oid: string, period: string, periodType: string) => void
  setPeriod: (per: string) => void
  setOrgOid: (oid: string) => void
  requestSetFiltersDefault: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const FiltersContainer = ({
                            orgList, altOrgList, isFetchingFilters, isFetchingWidgets, orgOid, perList, period,
                            periodType, showFilters, requestOrg, requestWidgetsFromFilters, setPeriod, setOrgOid,
                            requestSetFiltersDefault
                          }: PropsType) => {
  useEffect(() => {
    if (!orgList.oid)
      requestOrg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Filters
      orgList={orgList}
      altOrgList={altOrgList}
      isFetchingFilters={isFetchingFilters}
      isFetchingWidgets={isFetchingWidgets}
      orgOid={orgOid}
      perList={perList}
      period={period}
      periodType={periodType}
      showFilters={showFilters}
      // ktl={ktl}
      // val={val}

      requestWidgetsFromFilters={requestWidgetsFromFilters}
      setPeriod={setPeriod}
      setOrgOid={setOrgOid}
      requestSetFiltersDefault={requestSetFiltersDefault}
    />
  )
};

const mapState = (state: RootStateType) => ({
  orgList: selectOrgList(state),
  altOrgList: selectAltOrgList(state),
  isFetchingFilters: selectIsFetchingFilters(state),
  isFetchingWidgets: selectIsFetchingWidgets(state),
  orgOid: selectOrgOid(state),
  perList: selectPerList(state),
  period: selectPeriod(state),
  periodType: selectPeriodType(state),
  showFilters: selectShowFilters(state),
  // ktl: selectKTL(state),
  // val: selectVal(state),
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapState, {
  requestOrg, requestWidgetsFromFilters, setPeriod, setOrgOid, requestSetFiltersDefault
})(FiltersContainer);
