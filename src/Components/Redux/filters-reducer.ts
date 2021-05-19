interface ActionElements {
  type: string,
  data?: [],
}

let initialState: object = {
  org_list: [],
  isFetchingFilters: false,
  org_oid: '281586771165316',
  fn_date:  new Date().toISOString().slice(0,10), //'2021-03-30',
  st_date:  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
  ktl: {
    ka_atr: 'ka', // or mct
    ktl_oid: '281586771165316',
  },
  val: 'percent',
};


const filtersReducer = (state = initialState, action: ActionElements) => {
  console.log(state)
  return state;
};

export default filtersReducer;
