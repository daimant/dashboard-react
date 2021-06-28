import {RootStateType} from "./store";

//widgets
export const selectKPK = (state: RootStateType) => state.widgets.kpk;
export const selectKPKChild = (state: RootStateType) => state.widgets.kpkChild;
export const selectSC = (state: RootStateType) => state.widgets.sc;
export const selectTops = (state: RootStateType) => state.widgets.tops;
export const selectTodays = (state: RootStateType) => state.widgets.todays;
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
export const selectIsFetchingWidgets = (state: RootStateType) => state.widgets.isFetchingWidgets;

//filters
export const selectOrgList = (state: RootStateType) => state.filters.orgList;
export const selectIsFetchingFilters = (state: RootStateType) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: RootStateType) => state.filters.orgOid;
// export const selectKTL = (state: any) => state.filters.ktl;
// export const selectVal = (state: any) => state.filters.val;
export const selectPerList = (state: RootStateType) => state.filters.perList;
export const selectPeriod = (state: RootStateType) => state.filters.period;
export const selectPeriodType = (state: RootStateType) => state.filters.periodType;
export const selectShowFilters = (state: RootStateType) => state.filters.showFilters;
export const selectOrgMapList = (state: RootStateType) => state.filters.orgMapList;
export const selectPeriodNameMapList = (state: RootStateType) => state.filters.periodNameMapList;
export const selectAltOrgList = (state: RootStateType) => state.filters.altOrgList;
