import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import {AITextField } from "../commen/AIField";
import {withStyles} from "@material-ui/styles";

const styles = ((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

function getSeconds(time) {
    let nowDate = new Date();
    let string = nowDate.toISOString().substring(0,16);
    let afterDate = new Date(string);
    let pickDate = new Date(time);
    let seconds = (pickDate.getTime() - afterDate.getTime()) / 1000;
    console.log("getSeconds: ", seconds);
    return seconds;
}


@withStyles(styles)
class AdminTimePickerForm extends React.Component{
    submit = (values) => {
        console.log("values", values);

        this.props.submit(getSeconds(values.time));
    };


    validate = values => {
        const errors = {};

        let nowDate = new Date();
        if (values.time < nowDate.toISOString()) errors.time = "时间不能早于当前时间！";

        return errors;
    };


    render() {
        const {classes} = this.props;
        const date = new Date();
        console.log("time:", date.toISOString())
        const string = date.toISOString().substring(0,16);
        console.log("picker time:", string)

        return (
            <Formik
                initialValues={{
                    // time: '2017-05-24T10:30'
                    time: string
                }}
                validate={this.validate}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        this.submit(values);
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={classes.form}>
                        <Grid container spacing={2}>
                            <AITextField sm={12} name="time" label="时间" type='datetime-local'/>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            onClick={submitForm}
                            className={classes.submit}
                        >
                            确定
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default AdminTimePickerForm;
