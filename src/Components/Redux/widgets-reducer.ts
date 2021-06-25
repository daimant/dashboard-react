import {widgetsAPI} from "../../API/API";

type ActionsWidgetsType = {
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
  tops: object[]
}
type InitialStateWidgetsType = typeof initialStateWidgets;

export type KPKType = {
  nameCol: [string, string, string, string]
  data: KPKRowsType
}
type KPKRowsType = {
  Период: string
  Сегодня: string
  Сервис_oid: number
  Услуга: string
}
export type GraphType = {
  id?: number
  title: string
  data: GraphElementsType[]
};
type GraphElementsType = {
  d: string
  v: number
};
export type TodaysType = { title: string, v1: number, p: number, err: boolean };

type SetKPKActionType = { type: typeof SET_KPK, kpk: object };
type SetKPKChildActionType = { type: typeof SET_KPK_CHILD, kpkChild: object };
type SetSCActionType = { type: typeof SET_SC, sc: object[] };
type SetTodaysActionType = { type: typeof SET_TODAY, todays: object[] };
type SetTopsActionType = { type: typeof SET_TOPS, tops: object[] };
type SetIsFetchingWidgetsStartedActionType = { type: typeof SET_IS_FETCHING_WIDGETS_STARTED };
type SetIsFetchingWidgetsEndedActionType = { type: typeof SET_IS_FETCHING_WIDGETS_ENDED };
type RemoveKPKChildActionType = { type: typeof REMOVE_KPK_CHILD };

const SET_KPK = "SET_KPK";
const SET_KPK_CHILD = "SET_KPK_CHILD";
const SET_SC = "SET_SC";
const SET_TODAY = "SET_TODAY";
const SET_TOPS = "SET_TOPS";
const SET_IS_FETCHING_WIDGETS_STARTED = "SET_IS_FETCHING_WIDGETS_STARTED";
const SET_IS_FETCHING_WIDGETS_ENDED = "SET_IS_FETCHING_WIDGETS_ENDED";
const REMOVE_KPK_CHILD = 'REMOVE_KPK_CHILD';

let initialStateWidgets = {
  kpk: {} as {} | KPKType,
  kpkChild: {} as {} | KPKType,
  sc: [] as Array<object>,
  todays: [] as Array<object>,
  tops: [] as Array<object>,
  isFetchingWidgets: true as boolean,
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
  /* srvOid: 0,*/
};

const widgetsReducer = (state = initialStateWidgets, action: ActionsWidgetsType): InitialStateWidgetsType => {
  switch (action.type) {
    case SET_KPK:
      const kpk = (action.kpk)
        ? {data: action.kpk.data, nameCol: action.kpk.name_col}
        : {data: [], nameCol: ["\u0421\u0435\u0440\u0432\u0438\u0441_oid", "Ошибка при загрузке"]};
      return {...state, kpk};

    case SET_KPK_CHILD:
      const kpkChild = {data: action.kpkChild.data, nameCol: action.kpkChild.name_col};
      return {...state, kpkChild};

    case SET_SC:
      return action.sc.length ? {...state, sc: action.sc} : state;

    case SET_TODAY:
      return action.todays.length ? {...state, todays: action.todays} : state;

    case SET_TOPS:
      return action.tops.length ? {...state, tops: action.tops} : state;

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

export const setKPK = (kpk: object): SetKPKActionType => ({type: SET_KPK, kpk});
export const setKPKChild = (kpkChild: object): SetKPKChildActionType => ({type: SET_KPK_CHILD, kpkChild});
export const setSC = (sc: object[]): SetSCActionType => ({type: SET_SC, sc});
export const setTodays = (todays: object[]): SetTodaysActionType => ({type: SET_TODAY, todays});
export const setTops = (tops: object[]): SetTopsActionType => ({type: SET_TOPS, tops});
export const setIsFetchingWidgetsStarted = (): SetIsFetchingWidgetsStartedActionType => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = (): SetIsFetchingWidgetsEndedActionType => ({type: SET_IS_FETCHING_WIDGETS_ENDED});
export const removeKPKChild = (): RemoveKPKChildActionType => ({type: REMOVE_KPK_CHILD});

export const requestWidgets = (
  oid: string, period: string, periodType: string, numSC: number[] = [1, 2, 3], numTodays: number[] = [1, 2, 3], numTops: number[] = [1, 2]
) => async (dispatch: any) => {
  dispatch(setIsFetchingWidgetsStarted());
  const response = await widgetsAPI.getWidgets(oid, period, periodType, numSC, numTodays, numTops);
  dispatch(setSC(response.splice(0, numSC.length)));
  dispatch(setTodays(response.splice(0, numTodays.length)));
  dispatch(setTops(response.splice(0, numTops.length)));
  dispatch(setKPK(response.pop()));
  dispatch(setIsFetchingWidgetsEnded());
};
export const requestKPKChild = (oid: string, period: string, periodType: string, serviceOid: number) => async (dispatch: any) => {
  const responseKPKChild = await widgetsAPI.getKPK(oid, period, periodType, serviceOid);
  dispatch(setKPKChild(responseKPKChild));
};

export default widgetsReducer;
