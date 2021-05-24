import {filtersAPI, widgetsAPI} from "../../API/API";
import {setKPK} from "./widgets-reducer";
import {subMonths} from "date-fns";

interface ActionElements {
  type: string,
  data?: [],
}

const SET_ORG = "SET_ORG";
const SET_DATE = "SET_DATE";

const createPeriodTree = (st: Date, end: Date) => {
  const staticTree = {
    name: 'Период',
    oid: "root",
    children: [
      {
        name: '2020',
        oid: '0',
        children: [
          {
            name: '01',
            oid: '2',
            children: [
              {
                name: '01',
                oid: '8',
                children: []
              },
              {
                name: '02',
                oid: '9',
                children: []
              },
              {
                name: '03',
                oid: '10',
                children: []
              },
            ]
          },
          {
            name: '02',
            oid: '3',
            children: [
              {
                name: '04',
                oid: '11',
                children: []
              },
              {
                name: '05',
                oid: '12',
                children: []
              },
              {
                name: '06',
                oid: '13',
                children: []
              },
            ]
          },
          {
            name: '03',
            oid: '4',
            children: [
              {
                name: '07',
                oid: '14',
                children: []
              },
              {
                name: '08',
                oid: '15',
                children: []
              },
              {
                name: '09',
                oid: '16',
                children: []
              },
            ]
          },
          {
            name: '04',
            oid: '5',
            children: [
              {
                name: '10',
                oid: '17',
                children: []
              },
              {
                name: '11',
                oid: '18',
                children: []
              },
              {
                name: '12',
                oid: '19',
                children: []
              },
            ]
          }
        ]
      },
      {
        name: '2021',
        oid: '1',
        children: [
          {
            name: '01',
            oid: '6',
            children: [
              {
                name: '01',
                oid: '20',
                children: []
              },
              {
                name: '02',
                oid: '21',
                children: []
              },
              {
                name: '03',
                oid: '22',
                children: []
              },
            ]
          },
          {
            name: '02',
            oid: '7',
            children: [
              {
                name: '04',
                oid: '23',
                children: []
              },
              {
                name: '05',
                oid: '24',
                children: []
              },
            ]
          }
        ]
      },
    ]
  };

  const dynamicTree = []
  // console.log(st, end, staticTree)
  // for (let)
  return staticTree
}

let initialState: object = {
  org_list: [],
  per_list: createPeriodTree(new Date(2020, 0, 1), new Date(Date.now())),
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
