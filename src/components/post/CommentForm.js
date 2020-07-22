import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AITextField} from "../commen/AIField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    submit_primary: {
        // width: 90,
        height: 54,
        marginLeft: theme.spacing(1)
    },
    submit_secondary: {
        height: 40
    }
}));

export default function CommentForm(props){
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <Formik
                initialValues={{
                    comment: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        alert(JSON.stringify(values, null, 2));
                        console.log(values);
                        props.submit(values);
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={1}>
                            <AITextField sm={9} name="comment"
                                         variant={props.secondary?"standard" : "outlined"}
                                         size={props.secondary?"small" : "medium"}
                                         multiline label="评论"/>
                            <Grid item xs sm={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    className={props.secondary?
                                        classes.submit_secondary : classes.submit_primary}
                                >
                                    确定发布
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}


