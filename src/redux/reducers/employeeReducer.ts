import { IEmployeeAPI } from "../../dal/main";
import {IEmployee, IStateEmployee} from "../../interfaces/entities";
import {IAction, IEmployeeState} from "../../interfaces/states";

const CREATE_EMPLOYEE = "employee/CREATE_EMPLOYEE";
const SET_EMPLOYEES = "employee/SET_EMPLOYEES";
const DELETE_SELECTED_EMPLOYEE = "employee/DELETE_SELECTED_EMPLOYEE";
const SELECT_EMPLOYEE = "employee/SELECT_EMPLOYEE";
const UPDATE_EMPLOYEE = "employee/UPDATE_EMPLOYEE";

const initialState: IEmployeeState = {
    employees: [],
    selectedEmployeeId: null
}

export default function (state: IEmployeeState = initialState, action: IAction): object {
    switch (action.type) {
        case CREATE_EMPLOYEE:
            return { ...state, employees: [...state.employees, action.payload] }
        case SET_EMPLOYEES:
            return { ...state, employees: [...action.payload], isChanged: false }
        case SELECT_EMPLOYEE:
            return { ...state, selectedEmployeeId: action.payload }
        case DELETE_SELECTED_EMPLOYEE:
            return {
                ...state,
                selectedEmployeeId: null,
                employees: state.employees.filter((employee: IStateEmployee) => employee._id !== state.selectedEmployeeId)
            }
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                // @ts-ignore
                employees: state.employees.map((employee: IEmployee) => {
                    if (employee._id === action.payload._id) return action.payload
                    return employee;
                })
            }
        default:
            return initialState
    }
}

const createEmployeeAC = (payload: IStateEmployee) => ({
    type: CREATE_EMPLOYEE, payload
})

const setEmployeesAC = (payload: IStateEmployee[]) => ({
    type: SET_EMPLOYEES, payload
})

const deleteSelectedEmployeeAC = (payload: number) => ({
    type: DELETE_SELECTED_EMPLOYEE, payload
})

const updateEmployeeAC = (payload: IEmployee) => ({
    type: UPDATE_EMPLOYEE, payload
})

export const deleteSelectedEmployee = (payload: number) => (dispatch: any) => {
    IEmployeeAPI.deleteEmployee(payload);
    dispatch(deleteSelectedEmployeeAC(payload))
}

export const selectEmployeeAC = (payload: number) => ({
    type: SELECT_EMPLOYEE, payload
})

export const createEmployee = (data: IEmployee) => (dispatch: any) => {
    const newEmployee: IStateEmployee = IEmployeeAPI.createEmployee(data);
    dispatch(createEmployeeAC(newEmployee))
    dispatch(selectEmployeeAC(newEmployee._id!))
}

export const getEmployees = () => (dispatch: any) => {
    const employees: IStateEmployee[] = IEmployeeAPI.getEmployees();
    dispatch(setEmployeesAC(employees))
}

export const updateEmployee = (data: IEmployee) => (dispatch: any) => {
    IEmployeeAPI.updateEmployee(data);
    dispatch(updateEmployeeAC(data));
}

