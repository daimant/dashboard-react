import {AxiosResponse} from "axios";

const axios = require('axios').default;

const instance = axios.create({
  // baseURL: "http://10.248.40.236:7755/api/", // prod mode
  baseURL: "http://localhost:4000/",
});

export const widgetsAPI = {
  getKPK: (oid: string, period: string, period_type: string, serviceOid: number) => {
    return instance
      .get(`kpk`)
      // .post(`kpk`, { // prod mode
      //   "org_oid": +oid,
      //   "srv_oid" : serviceOid,
      //   "period": period,
      //   "period_type": period_type,
      //   "ktl": {
      //     "ka_atr": "ka", // or mct 
      //     "ktl_oid": 281586771165316,
      //   },
      //   "val": "percent",
      // })
      .then((response: AxiosResponse) => response.data);
  },
  getSC: (oid: string, period: string, period_type: string, num: number) => {
    return instance
      .get(`sc/${num}`)
      // .post(`sc/${num}`, { // prod mode
      //   "org_oid": +oid,
      //   "period": period,
      //   "period_type": period_type,
      //   "ktl": {
      //     "ka_atr": "ka", // or mct 
      //     "ktl_oid": 281586771165316,
      //   },
      //   "val": "percent",
      // })
      .then((response: AxiosResponse) => response.data)
      .catch(() => ({title: 'Ошибка при загрузке...', data: []}))
  },
  getINF:
    () => {
      return instance
        .get(`inf`)
        .then((response: AxiosResponse) => response.data);
    },
};
export const filtersAPI = {
  getOrg: () => {
    return instance
    // .get('/sprav/org_all') // prod mode
      .get('sprav_org_all')
      .then((response: AxiosResponse) => response.data);
  }
};
