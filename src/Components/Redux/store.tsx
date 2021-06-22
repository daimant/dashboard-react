import {applyMiddleware, combineReducers, createStore} from "redux";
import widgetsReducer from "./widgets-reducer";
import filtersReducer from "./filters-reducer";
import thunkMiddleware from "redux-thunk";
// import { configureStore } from '@reduxjs/toolkit'


let reducers = combineReducers({
  filters: filtersReducer,
  widgets: widgetsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export default store;
