import {widgetsAPI} from "../../API/API";

interface TypeActionWidgets {
  type: string
  kpk: {
    data: object
    name_col: object
  }
  kpkChild: {
    data: object
    name_col: object
  }
  sc: object[]
  todays: object[]
}

const SET_KPK = "SET_KPK";
const SET_KPK_CHILD = "SET_KPK_CHILD";
const SET_SC = "SET_SC";
const SET_TODAY = "SET_TODAY";
const SET_IS_FETCHING_WIDGETS_STARTED = "SET_IS_FETCHING_WIDGETS_STARTED";
const SET_IS_FETCHING_WIDGETS_ENDED = "SET_IS_FETCHING_WIDGETS_ENDED";
const REMOVE_KPK_CHILD = 'REMOVE_KPK_CHILD';

let initialState: object = {
  kpk: {},
  kpkChild: {},
  sc: [],
  todays: [],
  /*inf: [
    [
      "Чистая прибыль",
      "100М"
    ],
    [
      "EBITDA",
      "100М"
    ],
    [
      "Удовлетворенность клиентов",
      "99%"
    ],
    [
      "Рентабельность",
      "100%"
    ],
    [
      "ROIC",
      "100%"
    ],
    [
      "Производительность труда",
      "100K|P"
    ],
    [
      "KPI",
      "100%"
    ]
  ],*/
  isFetchingWidgets: true,
  /* srvOid: 0,*/
};

const widgetsReducer = (state = initialState, action: TypeActionWidgets) => {
  switch (action.type) {
    case SET_KPK:
      const kpk = {data: action.kpk.data, nameCol: action.kpk.name_col};
      return {...state, kpk};

    case SET_KPK_CHILD:
      const kpkChild = {data: action.kpkChild.data, nameCol: action.kpkChild.name_col};
      return {...state, kpkChild};

    case SET_SC:
      return action.sc.length ? {...state, sc: action.sc} : state;

    case SET_TODAY:
      return action.todays.length ? {...state, todays: action.todays} : state;

    case SET_IS_FETCHING_WIDGETS_STARTED:
      return {...state, isFetchingWidgets: true};

    case SET_IS_FETCHING_WIDGETS_ENDED:
      return {...state, isFetchingWidgets: false};

    case REMOVE_KPK_CHILD:
      return {...state, kpkChild: {}};

    default:
      return state;
  }
};

export const setKPK = (kpk: any) => ({type: SET_KPK, kpk});
export const setKPKChild = (kpkChild: any) => ({type: SET_KPK_CHILD, kpkChild});
export const setSC = (sc: object[]) => ({type: SET_SC, sc});
export const setTodays = (todays: object[]) => ({type: SET_TODAY, todays});
export const setIsFetchingWidgetsStarted = () => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = () => ({type: SET_IS_FETCHING_WIDGETS_ENDED});
export const removeKPKChild = () => ({type: REMOVE_KPK_CHILD});

export const requestWidgets = (
  oid: string, period: string, periodType: string, numSC: number[] = [1, 2, 3], numTodays: number[] = [1, 2, 3]
) => async (dispatch: any) => {
  dispatch(setIsFetchingWidgetsStarted());
  const response = await widgetsAPI.getWidgets(oid, period, periodType, numSC, numTodays);
  dispatch(setSC(response.splice(0, numSC.length)));
  dispatch(setTodays(response.splice(0, numTodays.length)));
  dispatch(setKPK(response.pop()));
  dispatch(setIsFetchingWidgetsEnded());
};
export const requestKPKChild = (oid: string, period: string, periodType: string, serviceOid: number) => async (dispatch: any) => {
  const responseKPKChild = await widgetsAPI.getKPK(oid, period, periodType, serviceOid);
  dispatch(setKPKChild(responseKPKChild));
};

export default widgetsReducer;
