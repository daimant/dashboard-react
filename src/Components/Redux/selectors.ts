// import {createSelector} from "reselect";

interface GraphSelectorElement {
  data: object,
}

export const getGraph = (state: GraphSelectorElement ) => state.data;
// export const getCurrentPage = (state) => state.serviceListData.current_page;
// export const getLastUpdateDate = (state) =>
//   state.serviceListData.lastUpdateDate;
// export const getTotalServices = (state) => state.serviceListData.total;
// export const getCountSort = (state) => state.serviceListData.countSort;
// export const getFavorites = (state) => state.serviceListData.favorites;
// export const getSortType = (state) => state.serviceListData.sortType;
// export const getSortDirect = (state) => state.serviceListData.sortDirect;
// export const getFavorites = createSelector(getFavoritesSelector, el =>
//   el.filter(() => true)
// );
