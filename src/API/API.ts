const axios = require('axios').default;

interface Res {
  data: object
}

const instance = axios.create({
  // baseURL: "http://10.248.40.236:7755/api/",
  baseURL: "http://localhost:4000/",
});

export const widgetsAPI = {
  getKPK: (oid: string = '281586771165316') => {
    return instance
      .get(`kpk`)
      .then((response: Res) => response.data);
  },
  getSC: (number: number) => {
    return instance
      .get(`sc/${number}`)
      .then((response: Res) => response.data);
  },
  getINF: () => {
    return instance
      .post(`inf`)
      .then((response: Res) => response.data);
  },
};
export const filtersAPI = {
  getOrg: () => {
    return instance
      .get('sprav_org_all_281586771165316')
      .then((response: Res) => response.data);
  }
}
