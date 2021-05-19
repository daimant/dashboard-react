const axios = require('axios').default;

interface Res {
  data: object
}

const instance = axios.create({
  baseURL: "http://10.248.40.236:7755/api/",
  // baseURL: "http://localhost:4000/",
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
}

export const widgetsAPI = {
  getLeftTable: () => {
    return instance
      .post(
        `kpk`, payload
      )
      .then(async (response: Res) => {
        console.log('api',response)
      });
      //.then(async (response: Res) => await response.data);

  },
  getGraph: (number: number) => {
    return instance
      .post(
        `sc/${number}`, payload
      )
      .then((response: Res) => response.data);
  },
  getRightTable: () => {
    return instance
      .post(
        `inf`
      )
      .then((response: Res) => response.data);
  },
  // getSortServices: (type, countSort = 0) => {
  //   return instance
  //     .get(
  //       `instrumentsList?instrument_type_code=cms&page=1&sort_direction=${
  //         countSort % 2 ? "asc" : "desc"
  //       }&sort=${type}`
  //     )
  //     .then((response) => response.data);
  // },
  // getNextPage: (currentPage, sortDirect, sortType) => {
  //   return instance
  //     .get(
  //       `instrumentsList?instrument_type_code=cms&page=${currentPage}&sort_direction=${sortDirect}&sort=${sortType}`
  //     )
  //     .then((response) => response.data);
  // },
};
