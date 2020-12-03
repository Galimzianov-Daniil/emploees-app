import React, {useState} from "react";
import { connect } from "react-redux";
import {IEmployee} from "../../interfaces/entities";
import EmployeeForm from "./EmployeeFormPresentation";
import {updateEmployee} from "../../redux/reducers/employeeReducer";


const UpdateEmployee: React.FC<{ employee: IEmployee, updateEmployee: any }> = ({ employee, updateEmployee }) => {

    const [data, setData] = useState(employee)
    const [isChanged, setChanged] = useState(false)
    console.log(employee)
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        updateEmployee(data);
        alert("Данные успешно обновлены");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data,  [e.target.name]: e.target.value})
        setChanged(true);
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.checked });
        setChanged(true);
    };

    return (
        <EmployeeForm
            buttonText="Обновить"
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
            handleSubmit={handleSubmit}
            data={data}
        />
    )
}

export default connect(null, {updateEmployee})(UpdateEmployee)