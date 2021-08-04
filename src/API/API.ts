import axios, {AxiosResponse} from 'axios';

const modeProd = false;
const instance = axios.create({
  baseURL: modeProd ? 'http://10.248.40.236:7755/api/' : 'http://localhost:4000/',
});
type GetWidgetsType = {
  oid: string
  period: string
  periodType: string
  serviceOid: number
  numSC: number[]
  numTodays: number[]
  numTops: number[]
  isOrgRZD?: boolean
}

const apiWidgetsProd = {
  getWidgets: ({oid, period, periodType, serviceOid, numSC, numTodays, numTops, isOrgRZD}: GetWidgetsType) => {
    const payload = {
      'org_oid': Number(oid),
      'srv_oid': serviceOid,
      'period': period,
      'period_type': periodType,
      'ktl': {
        'ka_atr': 'ka', // or mct 
        'ktl_oid': 281586771165316,
      },
      'val': 'percent',
    };
    return Promise.all<any>([
      ...numSC.map(num => instance.post(`sc/${num}`, payload).catch(() => {})),
      ...numTodays.map(num => instance.post(`today/${num}`, payload).catch(() => {})),
      ...numTops.map(num => instance.get(`top/${num}`).catch(() => {})),
      instance.post(isOrgRZD ? 'rzd_kpk' : 'kpk', payload).catch(() => {}),
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data));
  }
};
const apiWidgetsDev = {
  getWidgets: ({oid, period, periodType, serviceOid, numSC, numTodays, numTops}: GetWidgetsType) => {
    return Promise.all<any>([
      ...numSC.map(num => instance.get(`sc/${num}`).catch(() => {})),
      ...numTodays.map(num => instance.get(`today/${num}`).catch(() => {})),
      ...numTops.map(num => instance.get(`top/${num}`).catch(() => {})),
      instance.get(`kpk`).catch(() => {})
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
  getOrg: () => {
    return Promise.all<any>([
      instance.get('/sprav/org_all').catch(() => {}),
      instance.get('/sprav/org_rzd').catch(() => {}),
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data))
  }
};
const apiFiltersDev = {
  getOrg: () => {
    return Promise.all<any>([
      instance.get('sprav_org_all').catch(() => {}),
      instance.get('sprav_org_rzd').catch(() => {}),
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data))
  }
};

//@ts-ignore
export const widgetsAPI = modeProd ? apiWidgetsProd : apiWidgetsDev;//@ts-ignore
export const filtersAPI = modeProd ? apiFiltersProd : apiFiltersDev;

