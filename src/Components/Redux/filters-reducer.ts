import {filtersAPI, widgetsAPI} from "../../API/API";
import {requestWidgets, setIsFetchingWidgets, setKPK} from "./widgets-reducer";
import {selectNameOrg} from "./selectors";

interface TypeActionFilters {
  type: string
  orgList: {
    data: []
  }
  oid: string
  per: any
  point?: string
}

const SET_ORG = "SET_ORG";
const SET_PERIOD = "SET_PERIOD";
const CHANGE_ORG = "CHANGE_ORG";

const createPeriodTree = (st: Date, end: number) => {
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
  const pad = (num: any, size: number) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };
  // создаем произвольный узел
  const createNode = (name: string, oid: any, children: object[]) => {
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

    // для добавления кварталов необходимо понять какой минимальный и максимальный квартал
    let curr_q1 = (d1.getFullYear() === y ? Math.max(1, getQuarter(d1.getMonth())) : 1);
    let curr_q2 = (d2.getFullYear() === y ? Math.min(4, getQuarter(d2.getMonth())) : 4);

    // перебираем от начального квартала до конечного
    for (let q = curr_q1; q <= curr_q2; q++) {
      // type: "q"
      let nq = createNode(q + ' квартал', `q:${y}-0${q}`, []);

      //получаем доступные месяцы для выбранного квартала
      let mm = getMonths(q);

      // для добавления месяцев, необходимо понять какой минимальный и максимальный
      let curr_m1 = (d1.getFullYear() === y && q === curr_q1 ? Math.max(mm[0], d1.getMonth()) : mm[0]);
      let curr_m2 = (d2.getFullYear() === y && q === curr_q2 ? Math.min(mm[mm.length - 1], d2.getMonth()) : mm[mm.length - 1]);

      // перебираем от начального месяца до конечного
      for (let m = curr_m1; m <= curr_m2; m++) {
        // type: "m"
        let nm = createNode(months[m], `m:${y}-${pad((m + 1), 2)}`, []);

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

let initialState: object = {
  orgList: [],
  orgMapList: new Map([['281586771165316', "ООО ОСК ИнфоТранс"]]),
  perList: createPeriodTree(new Date(2020, 0, 1), Date.now()),
  isFetchingFilters: true,
  orgOid: localStorage.getItem('orgOid') || '281586771165316',
  orgName: localStorage.getItem('orgName') || "ООО ОСК ИнфоТранс",
  period: localStorage.getItem('period') || "2021-03",
  periodType: localStorage.getItem('periodType') || "y",
  periodName: "3 кв 2021",
  // fnDate: new Date().toISOString().slice(0, 10), // удалить
  // stDate: subMonths(new Date(), 1).toISOString().slice(0, 10), // удалить
  ktl: {
    kaAtr: 'ka', // or mct
    ktlOid: '281586771165316',
  },
  val: 'percent',
  heightDisplay: window.innerHeight,
};

const filtersReducer = (state = initialState, action: TypeActionFilters) => {
  switch (action.type) {
    case SET_ORG:
      return {...state, orgList: action.orgList.data, isFetchingFilters: false};

    case SET_PERIOD:
      const [periodType, period] = action.per.split(":");
      localStorage.setItem('periodType', periodType);
      localStorage.setItem('period', period);
      return periodType === 'root' ? state : {...state, periodType, period};

    case CHANGE_ORG:
      const newName = selectNameOrg(state, action.oid);
      localStorage.setItem('orgOid', action.oid);
      localStorage.setItem('orgName', newName);
      return newName ? {...state, orgName: newName, orgOid: action.oid} : {...state};

    default:
      return state;
  }
};

export const setOrg = (orgList: any) => ({type: SET_ORG, orgList});
export const setPeriod = (per: string) => ({type: SET_PERIOD, per});
export const changeOrg = (oid: string) => ({type: CHANGE_ORG, oid});

export const requestOrg = () => async (dispatch: any) => {
  const response = await filtersAPI.getOrg();
  dispatch(setOrg(response));
};

export const requestWidgetsFromFilters = (oid: string, period: string, periodType: string) => async (dispatch: any) => {
  dispatch(requestWidgets(oid,period, periodType));
  dispatch(changeOrg(oid));
};


export default filtersReducer;
