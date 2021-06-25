import {RootStateType} from "./store";

//widgets
export const selectKPK = (state: RootStateType, kpkName: string = 'kpk') => kpkName === 'child' ? state.widgets.kpkChild : state.widgets.kpk;
export const selectGraph = (state: any, howGraph: string) => {
  if (!state.widgets[howGraph]) return {};
  for (let i in state.widgets[howGraph]) {
    if (!state.widgets[howGraph][i]) {
      state.widgets[howGraph][i] = {title: 'Ошибка при загрузке', data: []};
      continue;
    }

    const point = state.widgets[howGraph][i];
    for (let i in point.data) {
      if (point.data[i]['p'] <= 1)
        point.data[i]['p'] = +(point.data[i]['p'] * 100).toFixed(2);
    }
  }

  return state.widgets[howGraph]
};
export const selectTodays = (state: any) => {
  if (!state.widgets.todays.length) return [];

  for (let i in state.widgets.todays) {
    if (!state.widgets.todays[i] || state.widgets.todays[i].v1 === null || state.widgets.todays[i].p === null)
      state.widgets.todays[i] = {title: "Ошибка при загрузке", err: true};
    else if (state.widgets.todays[i].p <= 1)
      state.widgets.todays[i].p = +(state.widgets.todays[i].p * 100).toFixed(1);
  }
  return state.widgets.todays;
};
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
export const selectOrgList = (state: any) => {
  const currOrgList: any = state.filters.orgList;
  if (!currOrgList || !currOrgList[0] || currOrgList[0]?.oid !== 281586771165316) return currOrgList;
  if (currOrgList.children && currOrgList.children.length) {
    return currOrgList;
  }
  const orgPosition = new Map(currOrgList.map((el: any, i: any) => [el['oid'], i]));

  for (let i = currOrgList.length - 1; i > 0; i--) {
    state.filters.orgMapList.set(currOrgList[i].oid + '', currOrgList[i].name);
    const parentInList = orgPosition.get(currOrgList[i].parent);
    // @ts-ignore
    if (!currOrgList[parentInList]['children']) currOrgList[parentInList]['children'] = [];
    // @ts-ignore
    currOrgList[parentInList]['children'] = [...currOrgList[parentInList]['children'], currOrgList[i]]
  }

  for (let org of currOrgList) {
    org.oid += '';
    org.parent += '';
  }

  for (let org of currOrgList) {
    if (org?.children?.length)
      org.children.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
  }

  const altOrgList = JSON.parse(JSON.stringify(currOrgList[0]));

  for (let i = altOrgList.children.length - 1; altOrgList.name && i >= 0; i--) {
    if (!altOrgList.children[i].zno)
      altOrgList.children.splice(i, 1);
  }

  state.filters.altOrgList = altOrgList;
  state.filters.orgList = currOrgList[0];
  return currOrgList[0];
};
export const selectIsFetchingFilters = (state: RootStateType) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: RootStateType) => state.filters.orgOid;
export const selectOrgName = (state: RootStateType) => state.filters.orgName;
export const selectKTL = (state: any) => state.filters.ktl;
export const selectVal = (state: any) => state.filters.val;
export const selectPerList = (state: RootStateType) => state.filters.perList;
export const selectPeriod = (state: RootStateType) => state.filters.period;
export const selectPeriodType = (state: RootStateType) => state.filters.periodType;
export const selectSelectedFilters = (state: any) => state.filters.selectedFilters;
export const selectShowFilters = (state: RootStateType) => state.filters.showFilters;
export const selectOrgMapList = (state: RootStateType) => state.filters.orgMapList;
export const selectPeriodNameMapList = (state: RootStateType) => state.filters.periodNameMapList;
export const selectAltOrgList = (state: RootStateType) => state.filters.altOrgList;

// filters-reducer
export const selectNameOrg = (state: any, oid: string) => state.orgMapList.get(oid);
