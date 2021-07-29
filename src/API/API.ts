import {AxiosResponse} from 'axios';

const axios = require('axios').default;
const instance = axios.create({
  // baseURL: 'http://10.248.40.236:7755/api/', // prod mode
  baseURL: 'http://localhost:4000/',
});
type GetWidgetsType = {
  oid: string, period: string, periodType: string, serviceOid: number, numSC: number[], numTodays: number[], numTops: number[]
}

export const widgetsAPI = {
  getWidgets: ({oid, period, periodType, serviceOid, numSC, numTodays, numTops}: GetWidgetsType) => {
    // const payload = {
    //   'org_oid': +oid,
    //   'srv_oid': serviceOid,
    //   'period': period,
    //   'period_type': periodType,
    //   'ktl': {
    //     'ka_atr': 'ka', // or mct 
    //     'ktl_oid': 281586771165316,
    //   },
    //   'val': 'percent',
    // };
    return axios.all([
      ...numSC.map(num => instance.get(`sc/${num}`).catch(() => {})),
      ...numTodays.map(num => instance.get(`today/${num}`).catch(() => {})),
      ...numTops.map(num => instance.get(`top/${num}`).catch(() => {})),
      instance.get(`kpk`).catch(() => {})
      // ...numSC.map(num => instance
      //   .post(`sc/${num}`, payload)
      //   .catch(() => {})
      // ), // prod mode
      // ...numTodays.map(num => instance
      //   .post(`today/${num}`, payload)
      //   .catch(() => {})
      // ), // prod mode
      // ...numTops.map(num => instance.get(`top/${num}`).catch(() => {})),
      // instance.post(`kpk`, payload).catch(() => {}), // prod mode
    ])
      .then((response: AxiosResponse[]) => response.map(res => res ? res.data : res));
  },
  /*
    getINF: () => {
        return instance
          .get(`inf`)
          .then((response: AxiosResponse) => response.data);
      },
  */
};
export const filtersAPI = {
  getOrg: () => {
    return instance
    // .get('/sprav/org_all') // prod mode
      .get('sprav_org_all')
      .then((response: AxiosResponse) => response.data);
  }
};
