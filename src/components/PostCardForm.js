import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom'
import {Formik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField} from "./basic/AIField";
import Uploader from "./basic/Uploader";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function PostCardForm(props){
    const classes = useStyles();
    const history = useHistory();

    const submit = () => {
        console.log(props.props)
        history.replace('/post');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3} className={classes.paper}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            alert(JSON.stringify(values, null, 2));
                            submit();
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <AITextField sm={12} name="content" label="博文内容" multiline/>
                                <Grid item xs={12} sm={12}>
                                    <Uploader/>
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                onClick={submitForm}
                                className={classes.submit}
                            >
                                确定发布
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}


