import {widgetsAPI} from "../../API/API";

interface TypeActionWidgets {
  type: string
  kpk: {
    data: object,
    name_col: object
  }
  kpkParent: {}
  sc: object[]
}

const SET_KPK = "SET_KPK";
const SET_KPK_PARENT = "SET_KPK_PARENT";
const SET_SC = "SET_SC";
const SET_IS_FETCHING_WIDGETS_STARTED = "SET_IS_FETCHING_WIDGETS_STARTED";
const SET_IS_FETCHING_WIDGETS_ENDED = "SET_IS_FETCHING_WIDGETS_ENDED";
const REMOVE_KPK_CHILD = 'REMOVE_KPK_CHILD';

let initialState: object = {
  kpk: {},
  kpkParent: {},
  sc: [],
  inf: [
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
  ],
  isFetchingWidgets: true,
  srvOid: 0,
};

const widgetsReducer = (state = initialState, action: TypeActionWidgets) => {
  switch (action.type) {
    case SET_KPK:
      const kpk = {data: action.kpk.data, nameCol: action.kpk.name_col};
      return {...state, kpk};

    case SET_KPK_PARENT:
      return {...state, kpkParent: action.kpkParent};

    case SET_SC:
      return action.sc.length ? {...state, sc: action.sc} : state;

    case SET_IS_FETCHING_WIDGETS_STARTED:
      return {...state, isFetchingWidgets: true};

    case SET_IS_FETCHING_WIDGETS_ENDED:
      return {...state, isFetchingWidgets: false};

    case REMOVE_KPK_CHILD:
      return{...state, kpk: action.kpkParent, kpkParent: {}};

    default:
      return state;
  }
};

export const setKPK = (kpk: any) => ({type: SET_KPK, kpk});
export const setKPKParent = (kpkParent: any) => ({type: SET_KPK_PARENT, kpkParent});
export const setSC = (sc: object[]) => ({type: SET_SC, sc});
export const setIsFetchingWidgetsStarted = () => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = () => ({type: SET_IS_FETCHING_WIDGETS_ENDED});
export const removeKPKChild = () => ({type: REMOVE_KPK_CHILD});

export const requestKPK = (oid: string, period: string, periodType: string, serviceOid = 0) => async (dispatch: any) => {
  const responseKPK = await widgetsAPI.getKPK(oid, period, periodType, serviceOid);
  dispatch(setKPK(responseKPK));
};
export const requestSC = (oid: string, period: string, periodType: string, numSC: number[]) => async (dispatch: any) => {
  const responseSC = [];

  if (numSC[0]) responseSC.push(await widgetsAPI.getSC(oid, period, periodType, numSC[0]));
  if (numSC[1]) responseSC.push(await widgetsAPI.getSC(oid, period, periodType, numSC[1]));
  if (numSC[2]) responseSC.push(await widgetsAPI.getSC(oid, period, periodType, numSC[2]));

  dispatch(setSC(responseSC));
};
export const requestWidgets = (oid: string, period: string, periodType: string, numSC: number[] = [1, 2, 3]) => async (dispatch: any) => {
  dispatch(setIsFetchingWidgetsStarted());
  await dispatch(requestKPK(oid, period, periodType));
  await dispatch(requestSC(oid, period, periodType, numSC));
  dispatch(setIsFetchingWidgetsEnded());
};
export const requestKPKChild = (oid: string, period: string, periodType: string, serviceOid: number, kpkParent: object) => async (dispatch: any) => {
  await dispatch(requestKPK(oid, period, periodType, serviceOid));
  dispatch(setKPKParent(kpkParent));
  console.log('widget-reducer setKPKParent', oid, period, periodType, serviceOid)
  // setKPKParent(kpkParent); //clear kpkParent dont forget
};

export default widgetsReducer;
