import {widgetsAPI} from '../../API/API';
import {PipeKPK, PipeGraphLine, PipeTodays, PipeGraphArea} from '../pipes';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../store';
import { GraphAreaType, GraphLineType, KPKType, TodaysType } from "../../Types/Types";
import {
  SET_KPK,
  SET_TODAYS_CHILD,
  SET_SC_CHILD,
  REMOVE_SERVICES_CHILD,
  SET_IS_FETCHING_WIDGETS_ENDED,
  SET_IS_FETCHING_WIDGETS_STARTED,
  SET_KPK_CHILD,
  SET_SC,
  SET_TODAYS,
  SET_TOPS
} from './action-types'

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

const setKPK = (kpk: KPKType): SetKPKACType => ({type: SET_KPK, kpk});
const setKPKChild = (kpkChild: KPKType): SetKPKChildACType => ({type: SET_KPK_CHILD, kpkChild});
const setSC = (sc: Array<GraphLineType>): SetSCACType => ({type: SET_SC, sc});
const setSCChild = (scChild: Array<GraphLineType>): SetSCChildACType => ({type: SET_SC_CHILD, scChild});
const setTodays = (todays: Array<TodaysType>): SetTodaysACType => ({type: SET_TODAYS, todays});
const setTodaysChild = (todaysChild: Array<TodaysType>): SetTodaysChildACType => ({
  type: SET_TODAYS_CHILD,
  todaysChild
});
const setTops = (tops: Array<GraphAreaType>): SetTopsACType => ({type: SET_TOPS, tops});
const setIsFetchingWidgetsStarted = (): SetIsFetchingWidgetsStartedACType => ({type: SET_IS_FETCHING_WIDGETS_STARTED});
const setIsFetchingWidgetsEnded = (): SetIsFetchingWidgetsEndedACType => ({type: SET_IS_FETCHING_WIDGETS_ENDED});

export const removeServicesChild = (): RemoveServicesChildACType => ({type: REMOVE_SERVICES_CHILD});

export const requestWidgets = (
  oid: string, period: string, periodType: string, serviceOid: number, isOrgRZD: boolean, numSC: number[] = [1, 2, 3],
  numTodays: number[] = [1, 2, 3], numTops: number[] = [1, 2]
): ThunkAction<void, RootStateType, unknown, AnyAction> => async (dispatch) => {
  dispatch(setIsFetchingWidgetsStarted());

  const response = await widgetsAPI.getWidgets({serviceOid, oid, period, periodType, numSC, numTodays, numTops, isOrgRZD});
  dispatch(setSC(PipeGraphLine(response.splice(0, numSC.length))));
  dispatch(setTodays(PipeTodays(response.splice(0, numTodays.length))));
  dispatch(setTops(PipeGraphArea(response.splice(0, numTops.length))));
  dispatch(setKPK(PipeKPK(response.pop())));

  dispatch(setIsFetchingWidgetsEnded());
};

export const requestServicesChild = (
  oid: string, period: string, periodType: string, serviceOid: number, isOrgRZD: boolean, numSC: number[] = [1, 2, 3],
  numTodays: number[] = [1, 2, 3]
): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(setIsFetchingWidgetsStarted());

  const response = await widgetsAPI.getWidgets({oid, period, periodType, serviceOid, numSC, isOrgRZD, numTodays, numTops: []});
  dispatch(setSCChild(PipeGraphLine(response.splice(0, numSC.length))));
  dispatch(setTodaysChild(PipeTodays(response.splice(0, numTodays.length))));
  dispatch(setKPKChild(PipeKPK(response.pop())));

  dispatch(setIsFetchingWidgetsEnded());
};
