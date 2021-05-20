import {RootState} from "../Common/Types";

//widgets
export const selectKPK = (state: any) => {
  const {kpk} = state.widgets;

  if (!kpk.data) return {};

  const parsedKPK = [];
  for (let i = 0; i < kpk.data.length; i++) {
    const currObj: any = {};

    for (let j = 0; j < kpk.name_col.length; j++) {
      let currVal = kpk.data[i][j].replace(/,/, ".");

      currObj[kpk.name_col[j]] = +currVal
        ? Math.trunc(+currVal)
        : currVal;
    }
    parsedKPK.push(currObj);
  }

  return {cols: state.widgets.kpk.name_col, data: parsedKPK};
};
export const selectSC = (state: RootState) => {
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
export const selectIsFetchingWidgets = (state: RootState) => state.widgets.isFetchingWidgets;

//filters
export const selectOrgList = (state: any) => {
  const example = {
    id: '281586771165316',
    name: "ООО ОСК ИнфоТранс",
    children: [
      {
        id: '1',
        name: 'Операционный департамент',
      },
      {
        id: '3',
        name: "Сектор внутреннего контроля",
        children: [
          {
            id: '4',
            name: 'Сектор внутреннего контроля',
          },
        ],
      },
    ],
  };
  const orgList: { name: string, oid: number, parent: number}[] = state.filters.org_list;
  if (!orgList.length) return example;
  const orgPosition = new Map(orgList.map((el, i) => [el['oid'], i]));

  for (let i = orgList.length - 1; i > 0; i--) {
    const parentInList = orgPosition.get(orgList[i].parent);
    // @ts-ignore
    if (!orgList[parentInList]['children']) orgList[parentInList]['children'] = [];
    // @ts-ignore

    orgList[parentInList]['children'] = [...orgList[parentInList]['children'], orgList[i]]
  }
  // console.log(orgList, orgPosition)

  // @ts-ignore
  return orgList[0];
};
export const selectIsFetchingFilters = (state: any) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: any) => state.filters.org_oid;
export const selectOrgName = (state: any) => state.filters.org_name;
export const selectStDate = (state: any) => state.filters.st_date;
export const selectFnDate = (state: any) => state.filters.fn_date;
export const selectKTL = (state: any) => state.filters.ktl;
export const selectVal = (state: any) => state.filters.val;
