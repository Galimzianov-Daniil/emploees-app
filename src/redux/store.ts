import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import employeeReducer from "./reducers/employeeReducer";

const reducers = combineReducers({ employees: employeeReducer })
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;