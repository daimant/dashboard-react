const axios = require('axios').default;

interface Res {
  data: object
}

const instance = axios.create({
  baseURL: "http://localhost:4000/",
});

export const widgetsAPI = {
  getLeftTable: () => {
    return instance
      .get(
        `kpk`
      )
      .then((response: Res) => response.data);

  },
  getGraph: (number: number) => {
    return instance
      .get(
        `sc/${number}`
      )
      .then((response: Res) => response.data);
  },
  getRightTable: () => {
    return instance
      .get(
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
