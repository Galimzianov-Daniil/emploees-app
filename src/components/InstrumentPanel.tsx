import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {connect} from "react-redux";
import {deleteSelectedEmployee, getEmployees} from "../redux/reducers/employeeReducer";


const InstrumentPanel: React.FC<{ selectedEmployeeId: number, deleteSelectedEmployee: any, getEmployees: any }> =
    ({selectedEmployeeId, deleteSelectedEmployee, getEmployees}) => {
        return (
            <Box mt={2} mb={5}>
                <ButtonGroup color="primary" aria-label="contained primary button group">
                    <Button onClick={getEmployees}>Обновить</Button>
                    <Button color="secondary" disabled={!selectedEmployeeId}
                            onClick={() => deleteSelectedEmployee(selectedEmployeeId)}>Удалить</Button>
                </ButtonGroup>
            </Box>
        )
    }

const mapStateToProps = (state: any) => ({
    employees: state.employees.employees,
    selectedEmployeeId: state.employees.selectedEmployeeId,
    isChanged: state.employees.isChanged
})

export default connect(mapStateToProps, {deleteSelectedEmployee, getEmployees})(InstrumentPanel);