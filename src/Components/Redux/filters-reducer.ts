import {filtersAPI, widgetsAPI} from "../../API/API";
import {setKPK} from "./widgets-reducer";
import {subMonths} from "date-fns";

interface ActionElements {
  type: string,
  data?: [],
}

const SET_ORG = "SET_ORG";
const SET_DATE = "SET_DATE";


let initialState: object = {
  org_list: [],
  isFetchingFilters: true,
  org_oid: '281586771165316',
  org_name: "ООО ОСК ИнфоТранс",
  period: "2021-03",
  period_type: "m", // "q" "y"
  fn_date: new Date().toISOString().slice(0, 10), // удалить
  st_date: subMonths(new Date(), 1).toISOString().slice(0, 10), // удалить
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

    case SET_DATE:
      //@ts-ignore
      if (action.point === 'Начальная дата') return {...state, st_date: action.date};
      //@ts-ignore
      else return {...state, fn_date: action.date};

    default:
      return state;
  }
};

export const setOrg = (org_list: any) => ({type: SET_ORG, org_list});
export const setDate = (date: string, point: string) => ({type: SET_DATE, date, point})

export const requestOrg = () => async (dispatch: any) => {
  const response = await filtersAPI.getOrg(); // переделать
  dispatch(setOrg(response));
};

export const requestWidgetsFromFilters = (oid: string = '281586771165316') => async (dispatch: any) => {
  const response = await widgetsAPI.getKPK(oid);
  dispatch(setKPK(response));
};


export default filtersReducer;
