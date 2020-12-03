import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import InstrumentPanel from "./components/InstrumentPanel";
import EmployeesList from "./components/EmployeesList";
import CreateNewEmployee from "./components/EmployeeForm/CreateNewEmployee";
import {getEmployees} from "./redux/reducers/employeeReducer";
import { func } from './interfaces/common';
import { connect } from 'react-redux';

const App: React.FC<{ getEmployees: func }> = ({ getEmployees }) => {

    useEffect(() => getEmployees(),[])

    return (
        <div className="App">
            <Grid container className="container">
                <Grid item xs={6}>
                    <InstrumentPanel/>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="container">
                <Grid item xs={6}>
                    <EmployeesList/>
                </Grid>
                <Grid item xs={6}>
                    <CreateNewEmployee/>
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(null, {getEmployees})(App);
