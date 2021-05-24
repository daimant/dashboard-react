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
    for (let j = 0; j < kpk.name_col.length; j++) {
      //пропускаем оид в каждой строке
      if (j === 0)
        currObj[kpk.name_col[j]] = kpk.data[i][j];
      else {
        //конвертируем в стринг значения для построения таблицы кпк
        if (typeof kpk.data[i][j] === 'number')
          kpk.data[i][j] += '';

        let currVal = kpk.data[i][j].replace(/,/, ".");

        currObj[kpk.name_col[j]] = +currVal
          ? Math.trunc(+currVal)
          : currVal;
      }
    }
    parsedKPK.push(currObj);
  }

  return {cols: state.widgets.kpk.name_col, data: parsedKPK};
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
export const selectFilters = (state: any) => state.widgets.srv_oid;

//filters
export const selectOrgList = (state: any) => {
  const example = {
    id: '281586771165316',
    name: "ООО ОСК ИнфоТранс",
  };
  const orgList: { name: string, oid: string, parent: string }[] = state.filters.org_list;
  if (!orgList[0]) return orgList;
  // @ts-ignore
  if (orgList.children && orgList.children.length) {
    // @ts-ignore
    return orgList;
  }
  const orgPosition = new Map(orgList.map((el, i) => [el['oid'], i]));


  for (let i = orgList.length - 1; i > 0; i--) {
    const parentInList = orgPosition.get(orgList[i].parent);
    // @ts-ignore
    if (!orgList[parentInList]['children']) orgList[parentInList]['children'] = [];
    // @ts-ignore
    orgList[parentInList]['children'] = [...orgList[parentInList]['children'], orgList[i]]
  }

  for (let org of orgList) {
    // @ts-ignore
    org.oid += '';
    // @ts-ignore
    org.parent += '';

  }
  // @ts-ignore
  state.filters.org_list = orgList[0]
  return orgList[0];
};
export const selectIsFetchingFilters = (state: any) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: any) => state.filters.org_oid;
export const selectOrgName = (state: any) => state.filters.org_name;
export const selectStDate = (state: any) => state.filters.st_date;
export const selectFnDate = (state: any) => state.filters.fn_date;
export const selectKTL = (state: any) => state.filters.ktl;
export const selectVal = (state: any) => state.filters.val;
