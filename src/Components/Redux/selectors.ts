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
  const currOrgList: { name: string, oid: string, parent: string }[] = state.filters.orgList;
  if (!currOrgList[0]) return currOrgList;
  // @ts-ignore
  if (currOrgList.children && currOrgList.children.length) {
    // @ts-ignore
    return currOrgList;
  }
  const orgPosition = new Map(currOrgList.map((el, i) => [el['oid'], i]));

  for (let i = currOrgList.length - 1; i > 0; i--) {
    state.filters.orgMapList.set(currOrgList[i].oid + '', currOrgList[i].name);
    const parentInList = orgPosition.get(currOrgList[i].parent);
    // @ts-ignore
    if (!currOrgList[parentInList]['children']) currOrgList[parentInList]['children'] = [];
    // @ts-ignore
    currOrgList[parentInList]['children'] = [...currOrgList[parentInList]['children'], currOrgList[i]]
  }

  for (let org of currOrgList) {
    // @ts-ignore
    org.oid += '';
    // @ts-ignore
    org.parent += '';
  }
  // @ts-ignore
  state.filters.orgList = currOrgList[0];
  return currOrgList[0];
};
export const selectIsFetchingFilters = (state: any) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: any) => state.filters.orgOid;
export const selectOrgName = (state: any) => state.filters.orgName;
// export const selectStDate = (state: any) => state.filters.stDate;
// export const selectFnDate = (state: any) => state.filters.fnDate;
export const selectKTL = (state: any) => state.filters.ktl;
export const selectVal = (state: any) => state.filters.val;
export const selectPerList = (state: any) => state.filters.perList;
export const selectKPKTitle = (state: any) => state.filters.orgName;
export const selectHeightDisplay = (state: any) => state.filters.heightDisplay;
export const selectPeriod = (state: any) => state.filters.period;
export const selectPeriodType = (state: any) => state.filters.periodType;

// filters-reducer
export const selectNameOrg = (state: any, oid: string) => state.orgMapList.get(oid);
