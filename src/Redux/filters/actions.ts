import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../store';
import {AnyAction} from 'redux';
import {filtersAPI} from '../../API/API';
import {PipeLists} from '../pipes';
import {removeServicesChild, requestWidgets} from '../widgets';
import {defaultFilters} from './reducer';
import {
  SET_FILTERS_DEFAULT,
  SET_LISTS,
  SET_ORG_NAME,
  SET_ORG_OID,
  SET_PERIOD,
  SET_SELECTED_KTL,
  SET_SELECTED_WORKERS,
  SET_SERVICE_OID,
  SET_SHOW_FILTERS,
  SET_SWITCH_SD_AWHIT,
  SET_DEF_PERIOD,
} from './action-types';
import {RequestWidgetsFromFiltersType, SelectedKTLType, SelectedWorkersType} from '../../Types/Types';

type SetListsACType = { type: typeof SET_LISTS, lists: object };
type SetPeriodACType = { type: typeof SET_PERIOD, per: string };
type SetOrgOidACType = { type: typeof SET_ORG_OID, orgOid: string };
type SetOrgNameACType = { type: typeof SET_ORG_NAME, orgOid: string };
type SetFiltersDefaultACType = { type: typeof SET_FILTERS_DEFAULT };
type SetShowFiltersACType = { type: typeof SET_SHOW_FILTERS };
type SetServiceOidACType = { type: typeof SET_SERVICE_OID, serviceOid?: string };
type SetSelectedKTLACType = { type: typeof SET_SELECTED_KTL, selectedKTL: SelectedKTLType };
type SetSelectedWorkersACType = { type: typeof SET_SELECTED_WORKERS, selectedWorkers: SelectedWorkersType };
type SetSwitchSDAWHITACType = { type: typeof SET_SWITCH_SD_AWHIT, switchSDAWHIT: boolean };
type SetDefPeriodACType = { type: typeof SET_DEF_PERIOD };

const setLists = (lists: object): SetListsACType => ({type: SET_LISTS, lists});
const setOrgName = (orgOid: string): SetOrgNameACType => ({type: SET_ORG_NAME, orgOid});
const setFiltersDefault = (): SetFiltersDefaultACType => ({type: SET_FILTERS_DEFAULT});

export const setPeriod = (per: string): SetPeriodACType => ({type: SET_PERIOD, per});

export const setOrgOid = (orgOid: string): SetOrgOidACType => ({type: SET_ORG_OID, orgOid});

export const setShowFilters = (): SetShowFiltersACType => ({type: SET_SHOW_FILTERS});

export const setServiceOid = (serviceOid?: string): SetServiceOidACType => ({type: SET_SERVICE_OID, serviceOid});

export const setSelectedKTL = (selectedKTL: SelectedKTLType): SetSelectedKTLACType => ({
  type: SET_SELECTED_KTL,
  selectedKTL
});

export const setSelectedWorkers = (selectedWorkers: SelectedWorkersType): SetSelectedWorkersACType => ({
  type: SET_SELECTED_WORKERS,
  selectedWorkers
});

export const setSwitchSDAWHIT = (switchSDAWHIT: boolean): SetSwitchSDAWHITACType => ({
  type: SET_SWITCH_SD_AWHIT,
  switchSDAWHIT
});

export const setDefPeriod = (): SetDefPeriodACType => ({type: SET_DEF_PERIOD});

export const requestOrg = (): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  const response = await filtersAPI.getOrg();
  dispatch(setLists(PipeLists(response?.data)));
};

export const requestWidgetsFromFilters = ({
                                            orgOid, period, periodType, selectedKTL, selectedWorkers
                                          }: RequestWidgetsFromFiltersType): ThunkAction<void, RootStateType, unknown, AnyAction> => async dispatch => {
  dispatch(requestWidgets({orgOid, period, periodType, selectedKTL, selectedWorkers}));
  dispatch(setOrgName(orgOid));
};

export const requestSetFiltersDefault = (): ThunkAction<void, RootStateType, unknown, AnyAction> => async (dispatch, getState) => {
  const filtersState = getState().filters;
  dispatch(requestWidgets({
    orgOid: filtersState.switchSDAWHIT ? defaultFilters.orgOidRZD : defaultFilters.orgOid,
    period: defaultFilters.period,
    periodType: defaultFilters.periodType,
    selectedKTL: defaultFilters.selectedKTL,
    selectedWorkers: defaultFilters.selectedWorkers,
  }));
  dispatch(setServiceOid());
  dispatch(removeServicesChild());
  dispatch(setFiltersDefault());
};
