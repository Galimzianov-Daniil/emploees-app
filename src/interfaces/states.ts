import { IStateEmployee } from "./entities";

export interface IAction {
    type: string,
    payload: any | any[]
}

export interface IEmployeeState {
    employees: IStateEmployee[] | [],
    selectedEmployeeId: number | null
}