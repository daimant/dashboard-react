import axios, {AxiosResponse} from 'axios';
import {SelectedKTLType, SelectedWorkersType} from '../Types/Types';

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
  selectedKTL: SelectedKTLType
  selectedWorkers: SelectedWorkersType
}

const catching = () => ({data: null});

const apiWidgetsProd = {
  getWidgets: ({orgOid, period, periodType, serviceOid, numSC, numTodays, numTops, selectedKTL, selectedWorkers}: GetWidgetsType) => {
    const payload = {
      'org_oid': Number(orgOid),
      'srv_oid': Number(serviceOid),
      'period': period,
      'period_type': periodType,
      'ktl': selectedKTL.map((el: string) => Number(el)),
      'workers_type': selectedWorkers,
    };
    return Promise.all<any>([
      ...numSC.map(num => instance.post(`sc/${num}`, payload).catch(catching)),
      ...numTodays.map(num => instance.post(`today/${num}`, payload).catch(catching)),
      ...numTops.map(num => instance.get(`top/${num}`).catch(catching)),
      instance.post('kpk', payload).catch(catching),
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data));
  }
};

const apiWidgetsDev = {
  getWidgets: ({numSC, numTodays, numTops}: GetWidgetsType) => {
    return Promise.all<any>([
      ...numSC.map(num => instance.get(`sc/${num}`).catch(catching)),
      ...numTodays.map(num => instance.get(`today/${num}`).catch(catching)),
      ...numTops.map(num => instance.get(`top/${num}`).catch(catching)),
      instance.get('kpk').catch(catching)
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
    .catch(catching)
    .then((response: AxiosResponse | { data: null }) => response.data)
};

const apiFiltersDev = {
  getOrg: () => instance
    .get('sprav_all')
    .catch(catching)
    .then((response: AxiosResponse | { data: null }) => response.data)
};

export const widgetsAPI = modeProd ? apiWidgetsProd : apiWidgetsDev;
export const filtersAPI = modeProd ? apiFiltersProd : apiFiltersDev;

