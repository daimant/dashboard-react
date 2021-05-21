import {filtersAPI, widgetsAPI} from "../../API/API";
import {setKPK} from "./widgets-reducer";

interface ActionElements {
  type: string,
  data?: [],
}

const SET_ORG = "SET_ORG";


let initialState: object = {
  org_list: [],
  isFetchingFilters: true,
  org_oid: '281586771165316',
  org_name: "ООО ОСК ИнфоТранс",
  fn_date: new Date().toISOString().slice(0, 10), //'2021-03-30',
  st_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  ktl: {
    ka_atr: 'ka', // or mct
    ktl_oid: '281586771165316',
  },
  val: 'percent',
};


const filtersReducer = (state = initialState, action: ActionElements) => {
  switch (action.type) {
    case SET_ORG:
      //@ts-ignore
      return {...state, org_list: action.org_list.data, isFetchingFilters: false};
    default:
      return state;
  }
};

export const setOrg = (org_list: any) => ({type: SET_ORG, org_list});

export const requestOrg = () => async (dispatch: any) => {
  const response = await filtersAPI.getOrg(); // переделать
  dispatch(setOrg(response));
};

export const requestWidgetsFromFilters = (oid: string = '281586771165316') => async (dispatch: any) => {
  const response = await widgetsAPI.getKPK(oid);
  dispatch(setKPK(response));
};

export default filtersReducer;
