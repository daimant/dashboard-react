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
      .then((response: AxiosResponse) => response.data)
      .catch(() => {});
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
      ...numSC.map(num => instance.get(`sc/${num}`).catch(() => {})),
      ...numTodays.map(num => instance.get(`today/${num}`).catch(() => {})),
      instance.get(`kpk`).catch(() => {})
      // ...numSC.map(num => instance
      //   .post(`sc/${num}`, payload)
      //   .catch(() => {})
      // ), // prod mode
      // ...numTodays.map(num => instance
      //   .post(`today/${num}`, payload)
      //   .catch(() => {})
      // ), // prod mode
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
