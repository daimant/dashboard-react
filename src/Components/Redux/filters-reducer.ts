interface ActionElements {
  type: string,
  data?: [],
}

let initialState: object = {
  isFetchingFilters: false,
  data: [],
};

const filtersReducer = (state = initialState, action: ActionElements) => {
  return state;
};

export default filtersReducer;
