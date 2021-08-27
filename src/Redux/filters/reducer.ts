import {
  KTLType,
  OrgListOSKType,
  OrgListRZDType,
  PeriodListType,
  WorkersType
} from '../../Types/Types';
import {
  SET_FILTERS_DEFAULT,
  SET_LISTS,
  SET_ORG_NAME,
  SET_ORG_OID,
  SET_PERIOD,
  SET_SERVICE_OID,
  SET_SHOW_FILTERS
} from './action-types';

type ActionsFiltersType = {
  type: string
  lists: {
    orgListOSK: {
      orgListOSK: OrgListOSKType[]
      altOrgListOSK: OrgListOSKType
      orgMapListOSK: Map<string, string>
    },
    orgListRZD: {
      orgListRZD: OrgListRZDType
      orgMapListRZD: Map<string, string>
    },
    ktl: KTLType,
    workers: WorkersType,
  }
  orgOid: string
  per: string
  serviceOid?: string
};

type InitialStateFiltersType = typeof initialStateFilters;

const periodNameMapList = new Map();

const createPeriodTree = (st: Date, end: number): PeriodListType[] => {
  const getQuarter = (month: number) => Math.floor((month + 3) / 3);

  const getMonthsInQuarter = (quarter: number) => {
    const arrMonth = [];

    for (let i = (quarter * 3 - 3); i <= (quarter * 3 - 1); i++) {
      arrMonth.push(i);
    }

    return arrMonth;
  };

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const createNode = (name: string, oid: string, children: object[]) => ({
    name: name,
    oid: oid,
    children: children
  });

  const dateSt = new Date(st);

  const dateEnd = new Date(end);

  const rootNode = [];

  for (let year = dateSt.getFullYear(); year <= dateEnd.getFullYear(); year++) {
    const newYears = createNode(`${year} год`, `y:${year}-01`, []);

    periodNameMapList.set(`y:${year}-01`, `${year} год`);

    const currQuarterSt = (dateSt.getFullYear() === year
      ? Math.max(1, getQuarter(dateSt.getMonth()))
      : 1);
    const currQuarterEnd = (dateEnd.getFullYear() === year
      ? Math.min(4, getQuarter(dateEnd.getMonth()))
      : 4);

    for (let quarter = currQuarterSt; quarter <= currQuarterEnd; quarter++) {
      const newQuarters = createNode(`${quarter} квартал`, `q:${year}-0${quarter}`, []);

      periodNameMapList.set(`q:${year}-0${quarter}`, `${year} год - ${quarter} квартал`);

      const availableMonths = getMonthsInQuarter(quarter);

      const currMonthSt = (dateSt.getFullYear() === year && quarter === currQuarterSt
        ? Math.max(availableMonths[0], dateSt.getMonth())
        : availableMonths[0]);
      const currMonthEnd = (dateEnd.getFullYear() === year && quarter === currQuarterEnd
        ? Math.min(availableMonths[availableMonths.length - 1], dateEnd.getMonth())
        : availableMonths[availableMonths.length - 1]);

      for (let month = currMonthSt; month <= currMonthEnd; month++) {
        const newMonths = createNode(months[month], `m:${year}-${(month + 1).toString().padStart(2, '0')}`, []);

        periodNameMapList.set(`m:${year}-${(month + 1).toString().padStart(2, '0')}`, `${year} год - ${months[month]}`);

        newQuarters.children.push(newMonths);
      }
      newYears.children.push(newQuarters);
    }
    rootNode.push(newYears);
  }

  return rootNode;
};

export const defaultFilters = {
  orgOid: '281586771165316',
  orgName: 'ООО ОСК ИнфоТранс',
  period: `${new Date().getFullYear()}-${new Date().getMonth() - 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}`,
  periodType: 'm',
};

const initialStateFilters = {
  orgListOSK: {} as OrgListOSKType,
  altOrgListOSK: {} as OrgListOSKType,
  orgMapListOSK: new Map() as Map<string, string>,
  orgListRZD: {} as OrgListRZDType,
  orgMapListRZD: new Map() as Map<string, string>,
  periodNameMapList: periodNameMapList as Map<string, string>,
  perList: createPeriodTree(new Date(2020, 0, 1), Date.now()) as PeriodListType[],
  isFetchingFilters: true as boolean,
  orgOid: localStorage.getItem('orgOid') || defaultFilters.orgOid as string,
  orgName: localStorage.getItem('orgName') || defaultFilters.orgName as string,
  period: localStorage.getItem('period') || defaultFilters.period as string,
  periodType: localStorage.getItem('periodType') || defaultFilters.periodType as string,
  showFilters: localStorage.getItem('showFilters') === 'true'
  || localStorage.getItem('showFilters') === null ? true : false as boolean,
  serviceOid: '0' as string,
  ktl: [] as KTLType[],
  workers: [] as WorkersType[],
};

const actionHandlerFilters: any = {
  [SET_LISTS]: (state: InitialStateFiltersType, action: ActionsFiltersType) =>
    action.lists ? {...state, ...action.lists, isFetchingFilters: false} : {...state, isFetchingFilters: false},

  [SET_PERIOD]: (state: InitialStateFiltersType, action: ActionsFiltersType) => {
    const [periodType, period] = action.per.split(':');
    if (periodType === 'root') return state;
    localStorage.setItem('periodType', periodType);
    localStorage.setItem('period', period);
    return {
      ...state,
      periodType,
      period
    };
  },

  [SET_ORG_OID]: (state: InitialStateFiltersType, action: ActionsFiltersType) => {
    localStorage.setItem('orgOid', action.orgOid);
    return action.orgOid
      ? {
        ...state,
        orgOid: action.orgOid
      }
      : state;
  },

  [SET_ORG_NAME]: (state: InitialStateFiltersType, action: ActionsFiltersType) => {
    const newName = state[
      state.orgMapListOSK.has(action.orgOid)
        ? 'orgMapListOSK'
        : 'orgMapListRZD'
      ].get(action.orgOid);
    if (newName !== undefined) {
      localStorage.setItem('orgName', newName);
    }
    return newName ? {
        ...state,
        orgName: newName
      }
      : state;
  },

  [SET_FILTERS_DEFAULT]: (state: InitialStateFiltersType) => {
    localStorage.removeItem('orgOid');
    localStorage.removeItem('period');
    localStorage.removeItem('periodType');
    localStorage.removeItem('orgName');
    return {
      ...state,
      orgOid: defaultFilters.orgOid,
      period: defaultFilters.period,
      periodType: defaultFilters.periodType,
      orgName: defaultFilters.orgName,
    };
  },

  [SET_SHOW_FILTERS]: (state: InitialStateFiltersType) => {
    localStorage.setItem('showFilters', String(!state.showFilters));
    return {
      ...state,
      showFilters: !state.showFilters
    };
  },

  [SET_SERVICE_OID]: (state: InitialStateFiltersType, action: ActionsFiltersType) => {
    return {
      ...state,
      serviceOid: (action.serviceOid ? action.serviceOid : '0')
    }
  },
};

const filtersReducer = (state = initialStateFilters, action: ActionsFiltersType): InitialStateFiltersType => {
  const handlerFilters = actionHandlerFilters[action.type];
  return handlerFilters ? handlerFilters(state, action) : state;
};

export default filtersReducer;
