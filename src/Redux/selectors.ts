import {RootStateType} from './store';

//widgets
export const selectKPK = (state: RootStateType) => state.widgets.kpk;
export const selectKPKChild = (state: RootStateType) => state.widgets.kpkChild;
export const selectSC = (state: RootStateType) => state.widgets.sc;
export const selectSCChild = (state: RootStateType) => state.widgets.scChild;
export const selectTodays = (state: RootStateType) => state.widgets.todays;
export const selectTodaysChild = (state: RootStateType) => state.widgets.todaysChild;
export const selectTops = (state: RootStateType) => state.widgets.tops;
export const selectIsFetchingWidgets = (state: RootStateType) => state.widgets.isFetchingWidgets;
export const selectDetailsSHK = (state: RootStateType) => state.widgets.detailsSHK;
export const selectDetailsZNO = (state: RootStateType) => state.widgets.detailsZNO;
/*
export const selectInf = (state: any) => {
  const {inf} = state.widgets;
  const parsedInf: object[] = [];

  if (!inf) return {};

  for (let i = 0; i < inf.length; i++) {
    parsedInf.push({name: inf[i][0], value: inf[i][1]})
  }
  return parsedInf;
};
*/

//filters
export const selectOrgListOSK = (state: RootStateType) => state.filters.orgListOSK;
export const selectAltOrgListOSK = (state: RootStateType) => state.filters.altOrgListOSK;
export const selectOrgMapListOSK = (state: RootStateType) => state.filters.orgMapListOSK;
export const selectOrgListRZD = (state: RootStateType) => state.filters.orgListRZD;
export const selectOrgMapListRZD = (state: RootStateType) => state.filters.orgMapListRZD;
export const selectIsFetchingFilters = (state: RootStateType) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: RootStateType) => state.filters.orgOid;
export const selectPerList = (state: RootStateType) => state.filters.perList;
export const selectPeriod = (state: RootStateType) => state.filters.period;
export const selectPeriodType = (state: RootStateType) => state.filters.periodType;
export const selectShowFilters = (state: RootStateType) => state.filters.showFilters;
export const selectPeriodNameMapList = (state: RootStateType) => state.filters.periodNameMapList;
export const selectServiceOid = (state: RootStateType) => state.filters.serviceOid;
export const selectKTL = (state: RootStateType) => state.filters.ktl;
export const selectWorkers = (state: RootStateType) => state.filters.workers;
export const selectSelectedKTL = (state: RootStateType) => state.filters.selectedKTL;
export const selectSelectedWorkers = (state: RootStateType) => state.filters.selectedWorkers;
