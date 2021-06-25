import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import widgetsReducer from "./widgets-reducer";
import filtersReducer from "./filters-reducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  filters: filtersReducer,
  widgets: widgetsReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
