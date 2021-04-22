import { applyMiddleware, combineReducers, createStore } from "redux";
// import navigationsReducer from "./navigations-reducer";
// import thunkMiddleware from "redux-thunk";
import widgetsReducer from "./widgets-reducer";
import filtersReducer from "./filters-reducer";
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
  widgetsData: widgetsReducer,
  filtersData: filtersReducer,
  // favoritesData: filtersReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
