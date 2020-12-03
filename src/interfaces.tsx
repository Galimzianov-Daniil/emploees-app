export interface IAction {
    type: string,
    payload: any
}

export interface IEmployee {
    position: string,
    name: string
    birthday: string | null,
    isFired: boolean,
    gender: "male" | "female" | " ",
    _id?: number,
    isChanged?: boolean
}