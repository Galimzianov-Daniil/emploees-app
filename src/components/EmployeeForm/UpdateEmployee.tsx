import React, {useState} from "react";
import { connect } from "react-redux";
import {IEmployee} from "../../interfaces";
import EmployeeForm from "./EmployeeFormPresentation";
import {updateEmployee} from "../../redux/reducers/employeeReducer";
import Button from "@material-ui/core/Button";


interface IUpdateEmployeeProps {
    employee: IEmployee,
    updateEmployee: (data: IEmployee) => void,
    close: () => void
}

const UpdateEmployee: React.FC<IUpdateEmployeeProps> = ({ employee, updateEmployee, close }) => {

    const [data, setData] = useState(employee)
    const [isChanged, setChanged] = useState(false)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        updateEmployee(data);
        alert("Данные успешно обновлены");
        close();
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
            CustomButton={() => <Button disabled={!isChanged} variant="contained" color="primary" type="submit">Обновить</Button>}
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
            handleSubmit={handleSubmit}
            data={data}
        />
    )
}

export default connect(null, {updateEmployee})(UpdateEmployee)