import {widgetsAPI} from '../API/API';
import {PipeKPK, PipeGraphLine, PipeTodays, PipeGraphArea} from './pipes';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {GraphAreaType, GraphLineType, KPKType, RawGraphAreaType, RawKPKType, TodaysType} from '../Types/Types';

type ActionsWidgetsType = {
  type: string
  kpk: RawKPKType
  kpkChild: RawKPKType
  sc: Array<GraphLineType>
  scChild: Array<GraphLineType>
  todays: Array<TodaysType>
  todaysChild: Array<TodaysType>
  tops: Array<RawGraphAreaType>
}
type InitialStateWidgetsType = typeof initialStateWidgets;

let initialStateWidgets = {
  kpk: {} as KPKType,
  kpkChild: {} as KPKType,
  sc: [] as Array<GraphLineType>,
  scChild: [] as Array<GraphLineType>,
  todays: [] as Array<TodaysType>,
  todaysChild: [] as Array<TodaysType>,
  tops: [] as Array<GraphAreaType>,
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
      if (!action.kpk.name_col)
        return state;
      const kpk = (action.kpk)
        ? PipeKPK(action.kpk)
        : {cols: ['Сервис_oid', 'Ошибка при загрузке'], rows: []};
      return {...state, kpk};

    case SET_KPK_CHILD:
      const kpkChild = (action.kpkChild)
        ? PipeKPK(action.kpkChild)
        : {cols: ['Услуга', 'Ошибка при загрузке'], rows: []};
      return {...state, kpkChild};

    case SET_SC:
      return action.sc.length ? {...state, sc: PipeGraphLine(action.sc)} : state;

    case SET_SC_CHILD:
      return action.scChild.length ? {...state, scChild: PipeGraphLine(action.scChild)} : state;

    case SET_TODAYS:
      return action.todays.length ? {...state, todays: PipeTodays(action.todays)} : state;

    case SET_TODAYS_CHILD:
      return action.todaysChild.length ? {...state, todaysChild: PipeTodays(action.todaysChild)} : state;

    case SET_TOPS:
      return action.tops.length ? {...state, tops: PipeGraphArea(action.tops)} : state;

    case SET_IS_FETCHING_WIDGETS_STARTED:
      return {...state, isFetchingWidgets: true};

    case SET_IS_FETCHING_WIDGETS_ENDED:
      return {...state, isFetchingWidgets: false};

    case REMOVE_SERVICES_CHILD:
      return {...state, kpkChild: {cols: [], rows: []}, scChild: []};

    default:
      return state;
  }
};

// action creators types
type SetKPKACType = { type: typeof SET_KPK, kpk: object };
type SetKPKChildACType = { type: typeof SET_KPK_CHILD, kpkChild: object };
type SetSCACType = { type: typeof SET_SC, sc: object[] };
type SetSCChildACType = { type: typeof SET_SC_CHILD, scChild: object[] };
type SetTodaysACType = { type: typeof SET_TODAYS, todays: object[] };
type SetTodaysChildACType = { type: typeof SET_TODAYS_CHILD, todaysChild: object[] };
type SetTopsACType = { type: typeof SET_TOPS, tops: object[] };
type SetIsFetchingWidgetsStartedACType = { type: typeof SET_IS_FETCHING_WIDGETS_STARTED };
type SetIsFetchingWidgetsEndedACType = { type: typeof SET_IS_FETCHING_WIDGETS_ENDED };
type RemoveServicesChildACType = { type: typeof REMOVE_SERVICES_CHILD };

// action types
const SET_KPK = 'SET_KPK';
const SET_KPK_CHILD = 'SET_KPK_CHILD';
const SET_SC = 'SET_SC';
const SET_SC_CHILD = 'SET_SC_CHILD';
const SET_TODAYS = 'SET_TODAYS';
const SET_TODAYS_CHILD = 'SET_TODAYS_CHILD';
const SET_TOPS = 'SET_TOPS';
const SET_IS_FETCHING_WIDGETS_STARTED = 'SET_IS_FETCHING_WIDGETS_STARTED';
const SET_IS_FETCHING_WIDGETS_ENDED = 'SET_IS_FETCHING_WIDGETS_ENDED';
const REMOVE_SERVICES_CHILD = 'REMOVE_SERVICES_CHILD';

// action creators
export const setKPK = (kpk: RawKPKType): SetKPKACType => ({type: SET_KPK, kpk});
export const setKPKChild = (kpkChild: RawKPKType): SetKPKChildACType => ({type: SET_KPK_CHILD, kpkChild});
export const setSC = (sc: Array<GraphLineType>): SetSCACType => ({type: SET_SC, sc});
export const setSCChild = (scChild: Array<GraphLineType>): SetSCChildACType => ({type: SET_SC_CHILD, scChild});
export const setTodays = (todays: Array<TodaysType>): SetTodaysACType => ({type: SET_TODAYS, todays});
export const setTodaysChild = (todaysChild: Array<TodaysType>): SetTodaysChildACType => ({type: SET_TODAYS_CHILD, todaysChild});
export const setTops = (tops: Array<RawGraphAreaType>): SetTopsACType => ({type: SET_TOPS, tops});
export const setIsFetchingWidgetsStarted = (): SetIsFetchingWidgetsStartedACType => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = (): SetIsFetchingWidgetsEndedACType => ({type: SET_IS_FETCHING_WIDGETS_ENDED});
export const removeServicesChild = (): RemoveServicesChildACType => ({type: REMOVE_SERVICES_CHILD});

// thunks
export const requestWidgets = (
  oid: string, period: string, periodType: string, numSC: number[] = [1, 2, 3], numTodays: number[] = [1, 2, 3], numTops: number[] = [1, 2]
): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(setIsFetchingWidgetsStarted());

  const response = await widgetsAPI.getWidgets({serviceOid: 0, oid, period, periodType, numSC, numTodays, numTops});
  dispatch(setSC(response.splice(0, numSC.length)));
  dispatch(setTodays(response.splice(0, numTodays.length)));
  dispatch(setTops(response.splice(0, numTops.length)));
  dispatch(setKPK(response.pop()));

  dispatch(setIsFetchingWidgetsEnded());
};

export const requestServicesChild = (
  oid: string, period: string, periodType: string, serviceOid: number, numSC: number[] = [1, 2, 3], numTodays: number[] = [1, 2, 3]
): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(setIsFetchingWidgetsStarted());

  const response = await widgetsAPI.getWidgets({oid, period, periodType, serviceOid, numSC, numTodays, numTops: []});
  dispatch(setSCChild(response.splice(0, numSC.length)));
  dispatch(setTodaysChild(response.splice(0, numTodays.length)));
  dispatch(setKPKChild(response.pop()));

  dispatch(setIsFetchingWidgetsEnded());
};

export default widgetsReducer;
