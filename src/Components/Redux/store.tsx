import {applyMiddleware, combineReducers, createStore} from "redux";
import widgetsReducer from "./widgets-reducer";
import filtersReducer from "./filters-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  filters: filtersReducer,
  widgets: widgetsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// export type RootState = ReturnType<typeof store.getState>;
// export type DispatchType = typeof store.dispatch;

export default store;
