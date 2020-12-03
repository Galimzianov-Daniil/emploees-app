import React, {useState} from "react";

import EmployeeForm from "./EmployeeFormPresentation";
import {connect} from "react-redux";
import {createEmployee} from "../../redux/reducers/employeeReducer";
import {IEmployee} from "../../interfaces";
import Button from "@material-ui/core/Button";

interface ICreateNewEmployeeProps {
    createEmployee: (data: IEmployee) => void
}

const CreateNewEmployee: React.FC<ICreateNewEmployeeProps> = ({createEmployee}) => {

    const initialData: IEmployee = {
        position: " ",
        name: "",
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
        setData({...data, [e.target.name]: e.target.checked});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    return (
        <EmployeeForm
            CustomButton={() => <Button variant="contained" color="primary" type="submit">Создать</Button>}
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
            handleSubmit={handleSubmit}
            data={data}
        />
    )

}

export default connect(null, {createEmployee})(CreateNewEmployee);