import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import employeeReducer from "./reducers/employeeReducer";

declare global {
    interface Window {
        store?: object;
    }
}

const reducers = combineReducers({
    employees: employeeReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store

export default store;