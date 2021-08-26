import axios, {AxiosResponse} from 'axios';

const modeProd = false;
const instance = axios.create({
  baseURL: modeProd ? 'http://10.248.40.236:7755/api/' : 'http://localhost:4000/',
});
type GetWidgetsType = {
  orgOid: string
  period: string
  periodType: string
  numSC: number[]
  numTodays: number[]
  numTops: number[]
  serviceOid: string
  ktl: string[]
}

const apiWidgetsProd = {
  getWidgets: ({orgOid, period, periodType, serviceOid, numSC, numTodays, numTops, ktl}: GetWidgetsType) => {
    const payload = {
      'org_oid': Number(orgOid),
      'srv_oid': Number(serviceOid),
      'period': period,
      'period_type': periodType,
      'ktl': ktl,
      'workers_type': [],
    };
    return Promise.all<any>([
      ...numSC.map(num => instance.post(`sc/${num}`, payload).catch(() => ({}))),
      ...numTodays.map(num => instance.post(`today/${num}`, payload).catch(() => ({}))),
      ...numTops.map(num => instance.get(`top/${num}`).catch(() => ({}))),
      instance.post('kpk', payload).catch(() => ({})),
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data));
  }
};
const apiWidgetsDev = {
  getWidgets: ({orgOid, period, periodType, serviceOid, numSC, numTodays, numTops}: GetWidgetsType) => {
    return Promise.all<any>([
      ...numSC.map(num => instance.get(`sc/${num}`).catch(() => ({}))),
      ...numTodays.map(num => instance.get(`today/${num}`).catch(() => ({}))),
      ...numTops.map(num => instance.get(`top/${num}`).catch(() => ({}))),
      instance.get('kpk').catch(() => ({}))
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data));
  }
  /*
  getINF: () => {
      return instance
        .get(`inf`)
        .then((response: AxiosResponse) => response.data);
    },
*/
};

const apiFiltersProd = {
  getOrg: () => instance
    .get('/sprav/all')
    .catch(() => ({data: null}))
    .then((response: AxiosResponse | {data: null}) => response.data)
};
const apiFiltersDev = {
  getOrg: () => instance
    .get('sprav_all')
    .catch(() => ({data: null}))
    .then((response: AxiosResponse | {data: null}) => response.data)
};

export const widgetsAPI = modeProd ? apiWidgetsProd : apiWidgetsDev;
export const filtersAPI = modeProd ? apiFiltersProd : apiFiltersDev;

