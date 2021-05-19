const axios = require('axios').default;

interface Res {
  data: object
}

const instance = axios.create({
  // baseURL: "http://10.248.40.236:7755/api/",
  baseURL: "http://localhost:4000/",
});

const payload = {
  org_oid: '281586771165316',
  st_date: '2021-03-01',
  fn_date: '2021-03-30',
  ktl: {
    ka_atr: 'ka', // or mct
    ktl_oid: '281586771165316',
  },
  val: 'percent',
};

export const widgetsAPI = {
  getKPK: () => {
    return instance
      .get(
        `kpk`
      )
      .then((response: Res) => response.data);
  },
  getSC: (number: number) => {
    return instance
      .get(
        `sc/${number}`
      )
      .then((response: Res) => response.data);
  },
  getINF: () => {
    return instance
      .post(
        `inf`
      )
      .then((response: Res) => response.data);
  },
};
