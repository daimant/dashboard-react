import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import widgetsReducer from "./widgets-reducer";
import filtersReducer from "./filters-reducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers = combineReducers({
  filters: filtersReducer,
  widgets: widgetsReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// export type RootState = ReturnType<typeof store.getState>;
// export type DispatchType = typeof store.dispatch;

export default store;
