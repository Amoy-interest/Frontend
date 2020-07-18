import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField} from "./basic/AIField";
// import Uploader from "./basic/Uploader";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom:theme.spacing(1),
        marginTop:theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        // margin: theme.spacing(),
        // marginLeft: theme.spacing(1)
    }
}));

export default function PostCardForm(props){
    const classes = useStyles();

    const submit = () => {
        console.log(props.props)
    }

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Paper elevation={3} className={classes.paper}>
                <Formik
                    initialValues={{
                        content: ''
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
                                <Grid item xs={12} sm={8}/>
                                <Grid item xs={12} sm={4}>
                                    {/*<Uploader/>*/}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        //fullWidth
                                        onClick={submitForm}
                                        className={classes.submit}
                                    >
                                        确定发布
                                    </Button>
                                </Grid>
                            </Grid>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}


