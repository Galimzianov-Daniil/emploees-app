import React, {useState} from "react";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import {selectEmployeeAC} from "../redux/reducers/employeeReducer";
import {connect} from "react-redux";
import {IEmployee} from "../interfaces/entities";
import UpdateEmployee from "./EmployeeForm/UpdateEmployee";
import DialogContent from "@material-ui/core/DialogContent";


const EmployeeRow: React.FC<{ selectedEmployeeId: number, employee: IEmployee, selectEmployee: any }> = ({selectedEmployeeId, employee, selectEmployee}) => {

    const [open, setOpen] = useState(false);

    return (
        <TableRow
            className={selectedEmployeeId === employee._id ? "selected-employee" : undefined}
            style={{cursor: "pointer"}}
            onClick={() => selectEmployee(employee._id!)}>
            <TableCell align="left" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
            >
                {employee.name}
                <Button size="small" color="primary" variant="outlined" onClick={() => setOpen(true)}>Просмотреть
                    профиль</Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <UpdateEmployee employee={employee}/>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}

const mapStateToProps = (state: any) => ({
    selectedEmployeeId: state.employees.selectedEmployeeId,
})

export default connect(mapStateToProps, {selectEmployee: selectEmployeeAC})(EmployeeRow)