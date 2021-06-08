import {AxiosResponse} from "axios";

const axios = require('axios').default;

const instance = axios.create({
  // baseURL: "http://10.248.40.236:7755/api/", // prod mode
  baseURL: "http://localhost:4000/",
});

export const widgetsAPI = {
  getKPK: (oid: string, period: string, period_type: string, serviceOid: number) => {
    // const payload = {
    //   "org_oid": +oid,
    //   "srv_oid": serviceOid,
    //   "period": period,
    //   "period_type": period_type,
    //   "ktl": {
    //     "ka_atr": "ka", // or mct 
    //     "ktl_oid": 281586771165316,
    //   },
    //   "val": "percent",
    // };
    return instance
      .get(`kpk`)
      // .post(`kpk`, payload) // prod mode
      .then((response: AxiosResponse) => response.data);
  },
  getWidgets: (oid: string, period: string, period_type: string, numSC: number[], numTodays: number[]) => {
    // const payload = {
    //   "org_oid": +oid,
    //   "srv_oid": 0,
    //   "period": period,
    //   "period_type": period_type,
    //   "ktl": {
    //     "ka_atr": "ka", // or mct 
    //     "ktl_oid": 281586771165316,
    //   },
    //   "val": "percent",
    // };
    return axios.all([
      ...numSC.map(num => instance.get(`sc/${num}`)),
      ...numTodays.map(num => instance.get(`today/${num}`)),
      instance.get(`kpk`)
      // ...numSC.map(num => instance.post(`sc/${num}`, payload)), // prod mode
      // ...numTodays.map(num => instance.post(`today/${num}`, payload)), // prod mode
      // instance.post(`kpk`, payload), // prod mode
    ])
      .then((response: AxiosResponse[]) => response.map(res => res.data))
      .catch(() => ([{title: 'Ошибка при загрузке...', data: []}]))
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
