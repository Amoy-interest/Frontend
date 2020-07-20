import {Field} from "formik";
import {TextField} from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { CheckboxWithLabel } from 'formik-material-ui';
import { Select } from 'formik-material-ui';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    text: {
        marginLeft: theme.spacing(2)
    }
}));



export function AITextField (props) {

    return (
        <Grid item xs={12} sm={props.sm}>
            <Field
                component={TextField}
                name={props.name}
                label={props.label?props.label:null}
                type={props.type?props.type:null}
                variant="outlined"
                multiline={!!props.multiline}
                required
                fullWidth
                autoFocus
                autoComplete={props.autoComplete?props.autoComplete:null}
            />
        </Grid>
    )
}

export function AICheckField (props) {

    return (
        <Grid item xs={12} sm={props.sm}>
            <Field
                component={CheckboxWithLabel}
                name={props.name}
                Label={{ label: props.label}}
            />
        </Grid>
    )
}



export function AIPickerField (props) {

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={props.sm}>
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-simple"
                            className={classes.text}>
                    {props.label?props.label:null}</InputLabel>
                <Field
                    varient="outlined"
                    fullWidth
                    component={Select}
                    name={props.name}
                    variant='filled'
                    inputProps={{
                        id: 'id-' + props.name,
                    }}
                >
                    {
                        props.array.map((item) => {
                            return(
                                <MenuItem value={item.value}>{item.name}</MenuItem>
                            )
                        })
                    }
                </Field>
            </FormControl>

        </Grid>
    )
}
