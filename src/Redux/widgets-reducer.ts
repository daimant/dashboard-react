import {widgetsAPI} from '../API/API';
import {PipeKPK, PipeGraphLine, PipeTodays, PipeGraphArea} from './pipes';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {GraphAreaType, GraphLineType, KPKType, TodaysType} from '../Types/Types';

type ActionsWidgetsType = {
  type: string
  kpk: KPKType
  kpkChild: KPKType
  sc: Array<GraphLineType>
  scChild: Array<GraphLineType>
  todays: Array<TodaysType>
  todaysChild: Array<TodaysType>
  tops: Array<GraphAreaType>
}
type InitialStateWidgetsType = typeof initialStateWidgets;

const initialStateWidgets = {
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
      'Чистая прибыль',
      '100М'
    ],
    [
      'EBITDA',
      '100М'
    ],
    [
      'Удовлетворенность клиентов',
      '99%'
    ],
    [
      'Рентабельность',
      '100%'
    ],
    [
      'ROIC',
      '100%'
    ],
    [
      'Производительность труда',
      '100K|P'
    ],
    [
      'KPI',
      '100%'
    ]
  ],*/
  /* srvOid: 0,*/
};

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

const actionHandlerWidgets: any = {
  [SET_KPK]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => {
    if (!action.kpk.cols)
      return state;
    const kpk = (action.kpk)
      ? action.kpk
      : {cols: ['Сервис_oid', 'Ошибка при загрузке'], rows: []};
    return {...state, kpk};
  },

  [SET_KPK_CHILD]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => {
    const kpkChild = (action.kpkChild)
      ? action.kpkChild
      : {cols: ['Услуга', 'Ошибка при загрузке'], rows: []};
    return {...state, kpkChild};
  },

  [SET_SC]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.sc.length ? {
    ...state,
    sc: action.sc
  } : state),

  [SET_SC_CHILD]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.scChild.length ? {
    ...state,
    scChild: action.scChild
  } : state),

  [SET_TODAYS]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.todays.length ? {
    ...state,
    todays: action.todays
  } : state),

  [SET_TODAYS_CHILD]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.todaysChild.length ? {
    ...state,
    todaysChild: action.todaysChild
  } : state),

  [SET_TOPS]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.tops.length ? {
    ...state,
    tops: action.tops
  } : state),

  [SET_IS_FETCHING_WIDGETS_STARTED]: (state: InitialStateWidgetsType) => ({...state, isFetchingWidgets: true}),

  [SET_IS_FETCHING_WIDGETS_ENDED]: (state: InitialStateWidgetsType) => ({...state, isFetchingWidgets: false}),

  [REMOVE_SERVICES_CHILD]: (state: InitialStateWidgetsType) => ({
    ...state,
    kpkChild: {cols: [], rows: []},
    scChild: [],
    todaysChild: []
  })
};
const widgetsReducer = (state = initialStateWidgets, action: ActionsWidgetsType): InitialStateWidgetsType => {
  const handlerWidgets = actionHandlerWidgets[action.type];
  return handlerWidgets ? handlerWidgets(state, action) : state;
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

// action creators
export const setKPK = (kpk: KPKType): SetKPKACType => ({type: SET_KPK, kpk});
export const setKPKChild = (kpkChild: KPKType): SetKPKChildACType => ({type: SET_KPK_CHILD, kpkChild});
export const setSC = (sc: Array<GraphLineType>): SetSCACType => ({type: SET_SC, sc});
export const setSCChild = (scChild: Array<GraphLineType>): SetSCChildACType => ({type: SET_SC_CHILD, scChild});
export const setTodays = (todays: Array<TodaysType>): SetTodaysACType => ({type: SET_TODAYS, todays});
export const setTodaysChild = (todaysChild: Array<TodaysType>): SetTodaysChildACType => ({
  type: SET_TODAYS_CHILD,
  todaysChild
});
export const setTops = (tops: Array<GraphAreaType>): SetTopsACType => ({type: SET_TOPS, tops});
export const setIsFetchingWidgetsStarted = (): SetIsFetchingWidgetsStartedACType => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = (): SetIsFetchingWidgetsEndedACType => ({type: SET_IS_FETCHING_WIDGETS_ENDED});
export const removeServicesChild = (): RemoveServicesChildACType => ({type: REMOVE_SERVICES_CHILD});

// thunks
export const requestWidgets = (
  oid: string, period: string, periodType: string, numSC: number[] = [1, 2, 3], numTodays: number[] = [1, 2, 3], numTops: number[] = [1, 2]
): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(setIsFetchingWidgetsStarted());

  const response = await widgetsAPI.getWidgets({serviceOid: 0, oid, period, periodType, numSC, numTodays, numTops});
  dispatch(setSC(PipeGraphLine(response.splice(0, numSC.length))));
  dispatch(setTodays(PipeTodays(response.splice(0, numTodays.length))));
  dispatch(setTops(PipeGraphArea(response.splice(0, numTops.length))));
  dispatch(setKPK(PipeKPK(response.pop())));

  dispatch(setIsFetchingWidgetsEnded());
};

export const requestServicesChild = (
  oid: string, period: string, periodType: string, serviceOid: number, numSC: number[] = [1, 2, 3], numTodays: number[] = [1, 2, 3]
): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(setIsFetchingWidgetsStarted());

  const response = await widgetsAPI.getWidgets({oid, period, periodType, serviceOid, numSC, numTodays, numTops: []});
  dispatch(setSCChild(PipeGraphLine(response.splice(0, numSC.length))));
  dispatch(setTodaysChild(PipeTodays(response.splice(0, numTodays.length))));
  dispatch(setKPKChild(PipeKPK(response.pop())));

  dispatch(setIsFetchingWidgetsEnded());
};

export default widgetsReducer;
