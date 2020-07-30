import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AITextField} from "../commen/AIField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    submit: {
        // width: 90,
        height: 54,
        marginLeft: theme.spacing(1)
    }
}));

export default function PostEditForm(props){
    const classes = useStyles();

    const submit = (values) => {
        props.submit(values);
    };

    return (
        <Container component="main" maxWidth="lg">
            <Formik
                initialValues={{
                    text: props.post_content
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        submit(values);
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form style={{marginBottom:'20px',marginTop:'20px'}}>
                        <Grid container spacing={1}>
                            <AITextField sm={9} name="text" multiline label="博文"/>
                            <Grid item xs sm={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    className={classes.submit}
                                >
                                    确定更改
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
