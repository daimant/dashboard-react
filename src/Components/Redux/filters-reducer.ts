import {filtersAPI} from "../../API/API";
import {requestWidgets} from "./widgets-reducer";
import {selectNameOrg} from "./selectors";

export type ActionsFiltersType = {
  type: string
  orgList: {
    data: []
  }
  oid: string
  per: string
  point?: string
  name: string
};
export type InitialStateFiltersType = typeof initialStateFilters;

export type PeriodListType = {
  name: string
  oid: string
  children?: object[]
};
type SetOrgListActionType = { type: typeof SET_ORG_LIST, orgList: object };
type SetPeriodActionType = { type: typeof SET_PERIOD, per: string };
type SetOrgOidActionType = { type: typeof SET_ORG_OID, oid: string };
type SetOrgNameActionType = { type: typeof SET_ORG_NAME, oid: string };
type SetFiltersDefaultActionType = { type: typeof SET_FILTERS_DEFAULT };
type SetShowFiltersActionType = { type: typeof SET_SHOW_FILTERS };

const SET_ORG_LIST = "SET_ORG_LIST";
const SET_PERIOD = "SET_PERIOD";
const SET_ORG_OID = "SET_ORG_OID";
const SET_ORG_NAME = "SET_ORG_NAME";
const SET_FILTERS_DEFAULT = "SET_FILTERS_DEFAULT";
const SET_SHOW_FILTERS = "SET_SHOW_FILTERS";

const tempPeriodNameMapList = new Map();
const createPeriodTree = (st: Date, end: number): PeriodListType => {
  //получить квартал по номеру месяца (от 0 - янв.)
  const getQuarter = (month: number) => {
    return Math.floor((month + 3) / 3);
  };
  ///возвращает нумерацию месяцев в квартале (0,1,2 - 1 кв.; 2 кв. - 3,4,5; и т.д.)
  const getMonths = (q: number) => {
    let arr = [];
    for (let i = (q * 3 - 3); i <= (q * 3 - 1); i++)
      arr.push(i);
    return arr;
  };
  // массив месяцев по-русски
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  // формат числа с лидирующими нулями
  const pad = (num: number | string, size: number) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };
  // создаем произвольный узел
  const createNode = (name: string, oid: string, children: object[]) => {
    return {
      name: name,
      oid: oid,
      children: children
    };
  };

  let d1 = new Date(st);
  let d2 = new Date(end);

  //создаем корень дерева
  let rootNode = createNode('Период', 'root', []);

  // перебираем от начального года до конечного
  for (let y = d1.getFullYear(); y <= d2.getFullYear(); y++) {
    // type: "y"
    let ny = createNode(y + ' год', `y:${y}-01`, []);

    // сохраняем год в коллекцию названий периодов
    tempPeriodNameMapList.set(`y:${y}-01`, `${y} год`);

    // для добавления кварталов необходимо понять какой минимальный и максимальный квартал
    let curr_q1 = (d1.getFullYear() === y ? Math.max(1, getQuarter(d1.getMonth())) : 1);
    let curr_q2 = (d2.getFullYear() === y ? Math.min(4, getQuarter(d2.getMonth())) : 4);

    // перебираем от начального квартала до конечного
    for (let q = curr_q1; q <= curr_q2; q++) {
      // type: "q"
      let nq = createNode(q + ' квартал', `q:${y}-0${q}`, []);

      // сохраняем квартал в коллекцию названий периодов
      tempPeriodNameMapList.set(`q:${y}-0${q}`, `${y} год - ${q} квартал`);

      //получаем доступные месяцы для выбранного квартала
      let mm = getMonths(q);

      // для добавления месяцев, необходимо понять какой минимальный и максимальный
      let curr_m1 = (d1.getFullYear() === y && q === curr_q1 ? Math.max(mm[0], d1.getMonth()) : mm[0]);
      let curr_m2 = (d2.getFullYear() === y && q === curr_q2 ? Math.min(mm[mm.length - 1], d2.getMonth()) : mm[mm.length - 1]);

      // перебираем от начального месяца до конечного
      for (let m = curr_m1; m <= curr_m2; m++) {
        // type: "m"
        let nm = createNode(months[m], `m:${y}-${pad((m + 1), 2)}`, []);

        // сохраняем месяц в коллекцию названий периодов
        tempPeriodNameMapList.set(`m:${y}-${pad((m + 1), 2)}`, `${y} год - ${months[m]}`);

        //добавляем месяцы
        nq.children.push(nm);
      }
      //добавляем кварталы
      ny.children.push(nq);
    }
    //добавляем годы в корень
    rootNode.children.push(ny);
  }

  //возврат всего дерева
  return rootNode;
};
const defaultFilters = {
  orgOid: '281586771165316',
  orgName: "ООО ОСК ИнфоТранс",
  period: `${new Date().getFullYear()}-${new Date().getMonth() - 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`,
  periodType: "m",
};

let initialStateFilters = {
  orgList: {},
  altOrgList: {},
  orgMapList: new Map([['281586771165316', "ООО ОСК ИнфоТранс"]]) as Map<string, string>,
  periodNameMapList: tempPeriodNameMapList as Map<string, string>,
  perList: createPeriodTree(new Date(2020, 0, 1), Date.now()) as PeriodListType,
  isFetchingFilters: true as boolean,
  orgOid: localStorage.getItem('orgOid') || defaultFilters.orgOid as string,
  orgName: localStorage.getItem('orgName') || defaultFilters.orgName as string,
  period: localStorage.getItem('period') || defaultFilters.period as string,
  periodType: localStorage.getItem('periodType') || defaultFilters.periodType as string,
  showFilters: localStorage.getItem('showFilters') === 'true' ? true : false as boolean,
  /*  ktl: {
      kaAtr: 'ka', // or mct
      ktlOid: '281586771165316',
    },*/
};

const filtersReducer = (state = initialStateFilters, action: ActionsFiltersType): InitialStateFiltersType => {
  switch (action.type) {
    case SET_ORG_LIST:
      return {...state, orgList: action.orgList.data, isFetchingFilters: false};

    case SET_PERIOD:
      const [periodType, period] = action.per.split(":");
      if (periodType === 'root') return state;
      localStorage.setItem('periodType', periodType);
      localStorage.setItem('period', period);
      return {...state, periodType, period};

    case SET_ORG_OID:
      localStorage.setItem('orgOid', action.oid);
      return action.oid ? {...state, orgOid: action.oid} : state;

    case SET_ORG_NAME:
      const newName = selectNameOrg(state, action.oid);
      localStorage.setItem('orgName', newName);
      return newName ? {...state, orgName: newName} : state;

    case SET_FILTERS_DEFAULT:
      localStorage.removeItem('orgOid');
      localStorage.removeItem('periodType');
      localStorage.removeItem('period');
      return {
        ...state,
        orgOid: defaultFilters.orgOid,
        period: defaultFilters.period,
        periodType: defaultFilters.periodType
      };

    case SET_SHOW_FILTERS:
      localStorage.setItem('showFilters', String(!state.showFilters));
      if (state.showFilters)
        return {...state, showFilters: false};
      else return {...state, showFilters: true};

    default:
      return state;
  }
};

export const setOrgList = (orgList: object): SetOrgListActionType => ({type: SET_ORG_LIST, orgList});
export const setPeriod = (per: string): SetPeriodActionType => ({type: SET_PERIOD, per});
export const setOrgOid = (oid: string): SetOrgOidActionType => ({type: SET_ORG_OID, oid});
export const setOrgName = (oid: string): SetOrgNameActionType => ({type: SET_ORG_NAME, oid});
export const setFiltersDefault = (): SetFiltersDefaultActionType => ({type: SET_FILTERS_DEFAULT});
export const setShowFilters = (): SetShowFiltersActionType => ({type: SET_SHOW_FILTERS});

export const requestOrg = () => async (dispatch: any) => {
  const response = await filtersAPI.getOrg();
  dispatch(setOrgList(response));
};
export const requestWidgetsFromFilters = (oid: string, period: string, periodType: string) => (dispatch: any) => {
  dispatch(requestWidgets(oid, period, periodType));
  dispatch(setOrgName(oid))
};
export const requestSetFiltersDefault = () => async (dispatch: any) => {
  dispatch(requestWidgets(defaultFilters.orgOid, defaultFilters.period, defaultFilters.periodType));
  dispatch(setFiltersDefault());
};


export default filtersReducer;
