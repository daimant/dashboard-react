import {filtersAPI, widgetsAPI} from "../../API/API";
import {setKPK} from "./widgets-reducer";
import {subMonths} from "date-fns";
import {selectNameOrg} from "./selectors";

interface ActionElements {
  type: string
  orgList: {
    data: []
  }
  oid: string
  per: string
  point?: string
}

const SET_ORG = "SET_ORG";
const SET_PERIOD = "SET_PERIOD";
const CHANGE_ORG = "CHANGE_ORG";

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
  orgList: [],
  orgMapList: new Map([['281586771165316',"ООО ОСК ИнфоТранс"]]),
  perList: createPeriodTree(new Date(2020, 0, 1), new Date(Date.now())),
  isFetchingFilters: true,
  orgOid: localStorage.getItem('orgOid') || '281586771165316',
  orgName: localStorage.getItem('orgName') || "ООО ОСК ИнфоТранс",
  period: localStorage.getItem('period') || "2021-03",
  periodType: "m", // "q" "y" нужен ли
  periodName: "3 кв 2021",
  // fnDate: new Date().toISOString().slice(0, 10), // удалить
  // stDate: subMonths(new Date(), 1).toISOString().slice(0, 10), // удалить
  ktl: {
    kaAtr: 'ka', // or mct
    ktlOid: '281586771165316',
  },
  val: 'percent',
  heightDisplay: window.innerHeight,
};

const filtersReducer = (state = initialState, action: ActionElements) => {
  switch (action.type) {
    case SET_ORG:
      // localStorage.setItem('filters', state.filters)
      return {...state, orgList: action.orgList.data, isFetchingFilters: false};

    case SET_PERIOD:
      localStorage.setItem('period', action.per);
      return {...state, fnDate: action.per};

    case CHANGE_ORG:
      const newName = selectNameOrg(state, action.oid);
      localStorage.setItem('orgOid', action.oid);
      localStorage.setItem('orgName', newName);
      return newName ? {...state, orgName: newName, orgOid: action.oid} : {...state};

    default:
      return state;
  }
};

export const setOrg = (orgList: any) => ({type: SET_ORG, orgList});
export const setPeriod = (per: string) => ({type: SET_PERIOD, per});
export const changeOrg = (oid: string) => ({type: CHANGE_ORG, oid});

export const requestOrg = () => async (dispatch: any) => {
  const response = await filtersAPI.getOrg(); // переделать
  dispatch(setOrg(response));
};

export const requestWidgetsFromFilters = (oid: string = '281586771165316') => async (dispatch: any) => {
  const response = await widgetsAPI.getKPK(oid);
  dispatch(changeOrg(oid));
  dispatch(setKPK(response));
};


export default filtersReducer;
