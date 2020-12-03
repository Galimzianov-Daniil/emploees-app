import React, {useState} from "react"
import { connect } from "react-redux";
import {IEmployee} from "../../interfaces/entities";
import EmployeeForm from "./EmployeeFormPresentation";
import {createEmployee} from "../../redux/reducers/employeeReducer";

const CreateNewEmployee: React.FC<{ createEmployee: any }> = ({ createEmployee }) => {

    const initialData: IEmployee = {
        position: " ",
        name: " ",
        birthday: "",
        isFired: false,
        gender: " ",
    }

    const [data, setData] = useState(initialData)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        createEmployee(data);
        setData(initialData);
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.checked });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data,  [e.target.name]: e.target.value})
    }

    return (
        <EmployeeForm
            buttonText="Создать"
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
            handleSubmit={handleSubmit}
            data={data}
        />
    )

}

export default connect(null, { createEmployee })(CreateNewEmployee)