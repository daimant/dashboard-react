import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store";
import {AnyAction} from "redux";
import {filtersAPI} from "../../API/API";
import {
  PipeOrgListOSK,
  PipeOrgListRZD
} from "../pipes";
import {removeServicesChild, requestWidgets} from "../widgets";
import {defaultFilters} from "./reducer";
import {
  SET_FILTERS_DEFAULT,
  SET_IS_ORG_RZD,
  SET_ORG_LIST_OSK,
  SET_ORG_LIST_RZD,
  SET_ORG_NAME,
  SET_ORG_OID,
  SET_PERIOD,
  SET_SHOW_FILTERS
} from "./action-types";

type SetOrgListOSKACType = { type: typeof SET_ORG_LIST_OSK, orgListOSK: object };
type SetOrgListRZDACType = { type: typeof SET_ORG_LIST_RZD, orgListRZD: object };
type SetPeriodACType = { type: typeof SET_PERIOD, per: string };
type SetOrgOidACType = { type: typeof SET_ORG_OID, oid: string };
type SetOrgNameACType = { type: typeof SET_ORG_NAME, oid: string };
type SetFiltersDefaultACType = { type: typeof SET_FILTERS_DEFAULT };
type SetShowFiltersACType = { type: typeof SET_SHOW_FILTERS };
type SetIsOrgRZD = { type: typeof SET_IS_ORG_RZD, isOrgRZD: boolean };

const setOrgListOSK = (orgListOSK: object): SetOrgListOSKACType => ({type: SET_ORG_LIST_OSK, orgListOSK});
const setOrgListRZD = (orgListRZD: object): SetOrgListRZDACType => ({type: SET_ORG_LIST_RZD, orgListRZD});
const setOrgName = (oid: string): SetOrgNameACType => ({type: SET_ORG_NAME, oid});
const setFiltersDefault = (): SetFiltersDefaultACType => ({type: SET_FILTERS_DEFAULT});

export const setPeriod = (per: string): SetPeriodACType => ({type: SET_PERIOD, per});

export const setOrgOid = (oid: string): SetOrgOidACType => ({type: SET_ORG_OID, oid});

export const setShowFilters = (): SetShowFiltersACType => ({type: SET_SHOW_FILTERS});

export const setIsOrgRZD = (isOrgRZD: boolean): SetIsOrgRZD => ({type: SET_IS_ORG_RZD, isOrgRZD});

export const requestOrg = (): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  const response = await filtersAPI.getOrg();
  dispatch(setOrgListOSK(PipeOrgListOSK(response[0].data)));
  dispatch(setOrgListRZD(PipeOrgListRZD(response[1].data)));
};
export const requestWidgetsFromFilters = (
  oid: string, period: string, periodType: string, serviceOid: number, isOrgRZD: boolean
): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(requestWidgets(oid, period, periodType, serviceOid, isOrgRZD));
  dispatch(setOrgName(oid))
};
export const requestSetFiltersDefault = (): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(requestWidgets(defaultFilters.orgOid, defaultFilters.period, defaultFilters.periodType, defaultFilters.serviceOid, defaultFilters.isOrgRZD));
  dispatch(removeServicesChild());
  dispatch(setFiltersDefault());
};
