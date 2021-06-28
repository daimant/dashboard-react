import {widgetsAPI} from "../../API/API";
import {PipeKPK, PipeGraph, PipeTodays} from "./pipes";

type ActionsWidgetsType = {
  type: string
  kpk: RawKPKType
  kpkChild: RawKPKType
  sc: Array<GraphType>
  tops: Array<GraphType>
  todays: Array<TodaysType>
}
type InitialStateWidgetsType = typeof initialStateWidgets;
export type RawKPKType = {
  name_col: [string, string, string, string]
  data: Array<[number, string, any, number]>
}
export type KPKType = {
  cols: [string, string, string, string]
  rows: Array<KPKRowsType>
} | {}
type KPKRowsType = {
  Период: string
  Сегодня: string
  Сервис_oid: number
  Услуга: string
} | []
export type GraphType = {
  id?: number
  title: string
  data: Array<GraphElementsType>
};
type GraphElementsType = {
  d: string
  v1: number
  v2: number
  p: number
};
export type TodaysType = { title: string, v1: number, p: number, err: boolean };

let initialStateWidgets = {
  kpk: {} as KPKType,
  kpkChild: {} as KPKType,
  sc: [] as Array<GraphType>,
  tops: [] as Array<GraphType>,
  todays: [] as Array<TodaysType>,
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
        ? PipeKPK(action.kpk)
        : {cols: ["Сервис_oid", "Ошибка при загрузке"], rows: []};
      return {...state, kpk};

    case SET_KPK_CHILD:
      const kpkChild = (action.kpkChild)
        ? PipeKPK(action.kpkChild)
        : {cols: ["Услуга", "Ошибка при загрузке"], rows: []};
      return {...state, kpkChild};

    case SET_SC:
      return action.sc.length ? {...state, sc: PipeGraph(action.sc)} : state;

    case SET_TOPS:
      return action.tops.length ? {...state, tops: PipeGraph(action.tops)} : state;

    case SET_TODAY:
      return action.todays.length ? {...state, todays: PipeTodays(action.todays)} : state;

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

// action creators types
type SetKPKACType = { type: typeof SET_KPK, kpk: object };
type SetKPKChildACType = { type: typeof SET_KPK_CHILD, kpkChild: object };
type SetSCACType = { type: typeof SET_SC, sc: object[] };
type SetTodaysACType = { type: typeof SET_TODAY, todays: object[] };
type SetTopsACType = { type: typeof SET_TOPS, tops: object[] };
type SetIsFetchingWidgetsStartedACType = { type: typeof SET_IS_FETCHING_WIDGETS_STARTED };
type SetIsFetchingWidgetsEndedACType = { type: typeof SET_IS_FETCHING_WIDGETS_ENDED };
type RemoveKPKChildACType = { type: typeof REMOVE_KPK_CHILD };

// action types
const SET_KPK = "SET_KPK";
const SET_KPK_CHILD = "SET_KPK_CHILD";
const SET_SC = "SET_SC";
const SET_TODAY = "SET_TODAY";
const SET_TOPS = "SET_TOPS";
const SET_IS_FETCHING_WIDGETS_STARTED = "SET_IS_FETCHING_WIDGETS_STARTED";
const SET_IS_FETCHING_WIDGETS_ENDED = "SET_IS_FETCHING_WIDGETS_ENDED";
const REMOVE_KPK_CHILD = 'REMOVE_KPK_CHILD';

// action creators
export const setKPK = (kpk: RawKPKType): SetKPKACType => ({type: SET_KPK, kpk});
export const setKPKChild = (kpkChild: RawKPKType): SetKPKChildACType => ({type: SET_KPK_CHILD, kpkChild});
export const setSC = (sc: Array<GraphType>): SetSCACType => ({type: SET_SC, sc});
export const setTops = (tops: Array<GraphType>): SetTopsACType => ({type: SET_TOPS, tops});
export const setTodays = (todays: Array<TodaysType>): SetTodaysACType => ({type: SET_TODAY, todays});
export const setIsFetchingWidgetsStarted = (): SetIsFetchingWidgetsStartedACType => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = (): SetIsFetchingWidgetsEndedACType => ({type: SET_IS_FETCHING_WIDGETS_ENDED});
export const removeKPKChild = (): RemoveKPKChildACType => ({type: REMOVE_KPK_CHILD});

// thunks
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
