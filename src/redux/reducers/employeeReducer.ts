import { IEmployeeAPI } from "../../dal";
import {IAction, IEmployee} from "../../interfaces";

const CREATE_EMPLOYEE = "employee/CREATE_EMPLOYEE";
const SET_EMPLOYEES = "employee/SET_EMPLOYEES";
const DELETE_SELECTED_EMPLOYEE = "employee/DELETE_SELECTED_EMPLOYEE";
const SELECT_EMPLOYEE = "employee/SELECT_EMPLOYEE";
const UPDATE_EMPLOYEE = "employee/UPDATE_EMPLOYEE";

interface IState {
    employees: IEmployee[],
    selectedEmployeeId: number | null
}

const initialState: IState = {
    employees: [],
    selectedEmployeeId: null
}

export default function (state: IState = initialState, action: IAction): object {
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
                employees: state.employees.filter((employee: IEmployee) => employee._id !== state.selectedEmployeeId)
            }
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.map((employee: IEmployee) => {
                    if (employee._id === action.payload._id) return action.payload
                    return employee;
                })
            }
        default:
            return initialState
    }
}

const createEmployeeAC = (payload: IEmployee) => ({
    type: CREATE_EMPLOYEE, payload
})

const setEmployeesAC = (payload: IEmployee[]) => ({
    type: SET_EMPLOYEES, payload
})

const deleteSelectedEmployeeAC = (payload: number) => ({
    type: DELETE_SELECTED_EMPLOYEE, payload
})

const updateEmployeeAC = (payload: IEmployee) => ({
    type: UPDATE_EMPLOYEE, payload
})

export const selectEmployeeAC = (payload: number) => ({
    type: SELECT_EMPLOYEE, payload
})

export const deleteSelectedEmployee = (payload: number) => (dispatch: (action: IAction) => void) => {
    IEmployeeAPI.deleteEmployee(payload);
    dispatch(deleteSelectedEmployeeAC(payload))
}

export const createEmployee = (data: IEmployee) => (dispatch: (action: IAction) => void) => {
    const newEmployee: IEmployee = IEmployeeAPI.createEmployee(data);
    dispatch(createEmployeeAC(newEmployee))
    dispatch(selectEmployeeAC(newEmployee._id!))
}

export const getEmployees = () => (dispatch: (action: IAction) => void)=> {
    const employees: IEmployee[] = IEmployeeAPI.getEmployees();
    dispatch(setEmployeesAC(employees))
}

export const updateEmployee = (data: IEmployee) => (dispatch: (action: IAction) => void) => {
    IEmployeeAPI.updateEmployee(data);
    dispatch(updateEmployeeAC(data));
}

