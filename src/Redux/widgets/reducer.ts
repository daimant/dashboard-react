import {GraphAreaType, GraphLineType, KPKType, TodaysType} from '../../Types/Types';
import {
  SET_TOPS,
  SET_TODAYS,
  SET_SC,
  SET_KPK_CHILD,
  SET_IS_FETCHING_WIDGETS_STARTED,
  SET_IS_FETCHING_WIDGETS_ENDED,
  REMOVE_SERVICES_CHILD,
  SET_SC_CHILD,
  SET_TODAYS_CHILD,
  SET_KPK,
  SET_DETAILS_SHK,
  SET_DETAILS_ZNO,
} from './action-types'

type InitialStateWidgetsType = typeof initialStateWidgets;

type ActionsWidgetsType = {
  type: string
  kpk: KPKType
  kpkChild: KPKType
  sc: GraphLineType[]
  scChild: GraphLineType[]
  todays: TodaysType[]
  todaysChild: TodaysType[]
  tops: GraphAreaType[]
  detailsSHK: GraphLineType[]
  detailsZNO: GraphLineType[]
}

const initialStateWidgets = {
  kpk: {} as KPKType,
  kpkChild: {} as KPKType,
  sc: [] as GraphLineType[],
  scChild: [] as GraphLineType[],
  todays: [] as TodaysType[],
  todaysChild: [] as TodaysType[],
  tops: [] as GraphAreaType[],
  isFetchingWidgets: true as boolean,
  detailsSHK: [] as GraphLineType[],
  detailsZNO: [] as GraphLineType[],
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
};

const actionHandlerWidgets: any = {
  [SET_KPK]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => {
    const kpk = (action.kpk)
      ? action.kpk
      : {cols: ['Сервис-oid', 'Ошибка при загрузке'], rows: []};
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
  }),

  [SET_DETAILS_SHK]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.detailsSHK.length ? {
    ...state,
    detailsSHK: action.detailsSHK
  } : state),

  [SET_DETAILS_ZNO]: (state: InitialStateWidgetsType, action: ActionsWidgetsType) => (action.detailsZNO.length ? {
    ...state,
    detailsZNO: action.detailsZNO
  } : state),
};

const widgetsReducer = (state = initialStateWidgets, action: ActionsWidgetsType): InitialStateWidgetsType => {
  const handlerWidgets = actionHandlerWidgets[action.type];
  return handlerWidgets ? handlerWidgets(state, action) : state;
};

export default widgetsReducer;
