export interface IEmployee {
    position: string,
    name: string
    birthday: string | null,
    isFired: boolean,
    gender: "male" | "female" | " ",
    _id?: number
}

export interface IStateEmployee extends IEmployee {
    isChanged?: boolean
}