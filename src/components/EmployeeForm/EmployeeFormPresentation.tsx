import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {createEmployee} from "../../redux/reducers/employeeReducer";
import {IEmployee} from "../../interfaces";

interface IEmployeeFormPresentationProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.SyntheticEvent) => void,
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void,
    data: IEmployee,
    CustomButton: React.FC
}

const EmployeeFormPresentation: React.FC<IEmployeeFormPresentationProps>
    = ({handleChange, handleSubmit, data, handleCheckbox, CustomButton}) => {

    return (
        <>
            <Box mb={2}>
                <Typography variant="h4" component="h4">Форма</Typography>
            </Box>

            <Grid container component="form" spacing={3} alignItems="center" onSubmit={handleSubmit}>

                <Grid item xs={12}>
                    <TextField
                        placeholder="ФИО"
                        required
                        fullWidth
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        select
                        fullWidth
                        label="Выберите должность"
                        onChange={handleChange}
                        value={data.position.trim()}
                        name="position"
                        required
                    >
                        <MenuItem value="Директор">Директор</MenuItem>
                        <MenuItem value="Главный директор">Главный директор</MenuItem>
                        <MenuItem value="Самый главный директор">Самый главный директор</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label="День рождения"
                        type="date"
                        value={data.birthday}
                        onChange={handleChange}
                        fullWidth
                        name="birthday"
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>

                <Grid item xs={6}>
                    <label>
                        <Checkbox name="isFired" color="primary" checked={data.isFired} onChange={handleCheckbox}/>
                        <Typography
                            variant="body1"
                            component="span"
                        >Уволен</Typography>
                    </label>
                </Grid>

                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Пол</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={data.gender} onChange={handleChange}>
                            <FormControlLabel value="female" control={<Radio/>} label="Мужской"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Женский"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <CustomButton/>
               </Grid>
            </Grid>
        </>
    )
}

export default connect(null, {createEmployee})(EmployeeFormPresentation)