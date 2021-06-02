import {RootState} from "../Common/Types";

//widgets
export const selectKPK = (state: any) => {
  const {kpk} = state.widgets;

  if (!kpk.data) return {};

  const parsedKPK = [];
  // идем по строкам сервисов
  for (let i = 0; i < kpk.data.length; i++) {
    const currObj: any = {};

    // идем по элеентам в строках
    for (let j = 0; j < kpk.nameCol.length; j++) {
      //пропускаем оид в каждой строке
      if (j === 0)
        currObj[kpk.nameCol[j]] = kpk.data[i][j];
      else {
        //конвертируем в стринг значения для построения таблицы кпк
        if (typeof kpk.data[i][j] === 'number')
          kpk.data[i][j] += '';

        let currVal = kpk.data[i][j].replace(/,/, ".");

        currObj[kpk.nameCol[j]] = +currVal
          ? Math.trunc(+currVal)
          : currVal;
      }
    }
    parsedKPK.push(currObj);
  }

  return {cols: state.widgets.kpk.nameCol, data: parsedKPK};
};
export const selectSC = (state: any) => {
  if (!state.widgets.sc) return {};

  for (let point of state.widgets.sc) {
    let min = Infinity;
    let max = -Infinity;

    for (let {v} of point.data) {
      if (v > max)
        max = v;
      if (v < min)
        min = v;
    }
    point.max = max;
    point.min = min;
  }

  return state.widgets.sc
};
export const selectInf = (state: any) => {
  const {inf} = state.widgets;
  const parsedInf: object[] = [];

  if (!inf) return {};

  for (let i = 0; i < inf.length; i++) {
    parsedInf.push({name: inf[i][0], value: inf[i][1]})
  }
  return parsedInf;
};
export const selectIsFetchingWidgets = (state: any) => state.widgets.isFetchingWidgets;
// export const selectFilters = (state: any) => state.widgets.srvOid; // ебанина какая-то

//filters
export const selectOrgList = (state: any) => {
  const currOrgList: any = state.filters.orgList;
  if (!currOrgList || !currOrgList[0] || currOrgList && currOrgList[0].oid !== 281586771165316) return currOrgList;
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

  const altOrgList = JSON.parse(JSON.stringify(currOrgList[0]));
  const removeOrgWithoutDoZNO = (orgs: any) => {
    if (!orgs.children.length) return;

    for (let i = orgs.children.length - 1; i >= 0; i--) {
      if (!orgs.children[i].do_ZNO)
        orgs.children.splice(i, 1);
      if (orgs.children[i].children)
        removeOrgWithoutDoZNO(orgs.children[i]);
    }
  };
  removeOrgWithoutDoZNO(altOrgList);

  state.filters.altOrgList = altOrgList;
  state.filters.orgList = currOrgList[0];
  return currOrgList[0];
};
export const selectIsFetchingFilters = (state: any) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: any) => state.filters.orgOid;
export const selectOrgName = (state: any) => state.filters.orgName;
export const selectKTL = (state: any) => state.filters.ktl;
export const selectVal = (state: any) => state.filters.val;
export const selectPerList = (state: any) => state.filters.perList;
export const selectHeightDisplay = (state: any) => state.filters.heightDisplay;
export const selectPeriod = (state: any) => state.filters.period;
export const selectPeriodType = (state: any) => state.filters.periodType;
export const selectSelectedFilters = (state: any) => state.filters.selectedFilters;
export const selectShowFilters = (state: any) => state.filters.showFilters;
export const selectOrgMapList = (state: any) => state.filters.orgMapList;
export const selectPeriodNameMapList = (state: any) => state.filters.periodNameMapList;
export const selectAltOrgList = (state: any) => state.filters.altOrgList;

// filters-reducer
export const selectNameOrg = (state: any, oid: string) => state.orgMapList.get(oid);
