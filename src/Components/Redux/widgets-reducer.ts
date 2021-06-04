import {widgetsAPI} from "../../API/API";
import {AxiosResponse} from "axios";

interface TypeActionWidgets {
  type: string
  kpk: {
    data: object,
    name_col: object
  }
  sc: object[];
}

const SET_KPK = "SET_KPK";
const SET_SC = "SET_SC";
const SET_IS_FETCHING_WIDGETS_STARTED = "SET_IS_FETCHING_WIDGETS_STARTED";
const SET_IS_FETCHING_WIDGETS_ENDED = "SET_IS_FETCHING_WIDGETS_ENDED";

let initialState: object = {
  kpk: {},
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

    case SET_SC:
      return action.sc.length ? {...state, sc: action.sc} : state;

    case SET_IS_FETCHING_WIDGETS_STARTED:
      return {...state, isFetchingWidgets: true};

    case SET_IS_FETCHING_WIDGETS_ENDED:
      return {...state, isFetchingWidgets: false};

    default:
      return state;
  }
};

export const setKPK = (kpk: any) => ({type: SET_KPK, kpk});
export const setSC = (sc: object[]) => ({type: SET_SC, sc});
export const setIsFetchingWidgetsStarted = () => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
export const setIsFetchingWidgetsEnded = () => ({type: SET_IS_FETCHING_WIDGETS_ENDED});

export const requestWidgets = (oid: string, period: string, periodType: string, numSC: number[] = [1,2,3]) => async (dispatch: any) => {
  dispatch(setIsFetchingWidgetsStarted());

  const responseKPK = await widgetsAPI.getKPK(oid, period, periodType);
  dispatch(setKPK(responseKPK));

  const responseSC = [];

  if (numSC[0]) responseSC.push(await widgetsAPI.getSC(oid, period, periodType, numSC[0]));
  if (numSC[1]) responseSC.push(await widgetsAPI.getSC(oid, period, periodType, numSC[1]));
  if (numSC[2]) responseSC.push(await widgetsAPI.getSC(oid, period, periodType, numSC[2]));

  dispatch(setSC(responseSC));

  dispatch(setIsFetchingWidgetsEnded());
};

export default widgetsReducer;
