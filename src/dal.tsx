import {IEmployee} from "./interfaces"


export const IEmployeeAPI = {
    createEmployee: (newEmployee: IEmployee): IEmployee => {

        const employees: IEmployee[] = JSON.parse(localStorage.getItem("employees") || '[]')
        newEmployee._id = new Date().getTime();
        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees))

        return newEmployee;
    },
    deleteEmployee: (id: number) => {
        const employees: IEmployee[] = JSON.parse(localStorage.getItem("employees") || '[]')
        const newEmployeesList = employees.filter((employee: IEmployee) => employee._id !== id)
        localStorage.setItem("employees", JSON.stringify(newEmployeesList))
    },
    getEmployees: () => {
        return JSON.parse(localStorage.getItem("employees") || '[]')
    },
    updateEmployee: (updatedEmployee: IEmployee) => {
        const employees: IEmployee[] = JSON.parse(localStorage.getItem("employees") || '[]')
        const newEmployeesList = employees.map((employee: IEmployee) => {
            if (employee._id === updatedEmployee._id) return updatedEmployee
            return employee;
        })
        localStorage.setItem("employees", JSON.stringify(newEmployeesList))
    }
}

export default IEmployeeAPI;