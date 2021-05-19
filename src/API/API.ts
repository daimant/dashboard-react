const axios = require('axios').default;

interface Res {
  data: object
}

const instance = axios.create({
  // baseURL: "http://10.248.40.236:7755/api/",
  baseURL: "http://localhost:4000/",
});

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
export const filtersAPI = {
  getORG: () => {
    return instance
      .post(
        ''
      )
  }
}
