// import {RootState} from "./store";

//widgets
export const selectKPK = (state: any, kpkName: string = 'kpk') => {
  const kpk = state.widgets[kpkName === 'child' ? 'kpkChild' : 'kpk'];

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

        currObj[kpk.nameCol[j]] = +currVal && +currVal % 1
          ? (+currVal).toFixed(2)
          : +currVal
            ? +currVal
            : currVal;
      }
    }
    parsedKPK.push(currObj);
  }

  return {cols: kpk.nameCol, data: parsedKPK};
};
export const selectSC = (state: any) => {
  if (!state.widgets.sc) return {};
  for (let i in state.widgets.sc) {
    if (!state.widgets.sc[i]) {
      state.widgets.sc[i] = {title: 'Ошибка при загрузке', data: []};
      continue;
    }

    const point = state.widgets.sc[i];
    for (let i in point.data) {
      if (point.data[i]['p'] <= 1)
        point.data[i]['p'] = +(point.data[i]['p'] * 100).toFixed(2);
    }
  }

  return state.widgets.sc
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
export const selectTops = (state: any) => {
  if (!state.widgets.tops) return {};
  for (let i in state.widgets.tops) {
    if (!state.widgets.tops[i]) {
      state.widgets.tops[i] = {title: 'Ошибка при загрузке', data: []};
      continue;
    }

    const point = state.widgets.tops[i];
    for (let i in point.data) {
      if (point.data[i]['p'] <= 1)
        point.data[i]['p'] = +(point.data[i]['p'] * 100).toFixed(2);
    }
  }

  return state.widgets.tops
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
export const selectIsFetchingFilters = (state: any) => state.filters.isFetchingFilters;
export const selectOrgOid = (state: any) => state.filters.orgOid;
export const selectOrgName = (state: any) => state.filters.orgName;
export const selectKTL = (state: any) => state.filters.ktl;
export const selectVal = (state: any) => state.filters.val;
export const selectPerList = (state: any) => state.filters.perList;
export const selectPeriod = (state: any) => state.filters.period;
export const selectPeriodType = (state: any) => state.filters.periodType;
export const selectSelectedFilters = (state: any) => state.filters.selectedFilters;
export const selectShowFilters = (state: any) => state.filters.showFilters;
export const selectOrgMapList = (state: any) => state.filters.orgMapList;
export const selectPeriodNameMapList = (state: any) => state.filters.periodNameMapList;
export const selectAltOrgList = (state: any) => state.filters.altOrgList;

// filters-reducer
export const selectNameOrg = (state: any, oid: string) => state.orgMapList.get(oid);
