import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik';
import Paper from '@material-ui/core/Paper';
import {AIPickerField, AITextField} from "./basic/AIField";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        width:350,
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
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function LoginForm(props){
    const classes = useStyles();
    const history = useHistory();
    const ages = [1, 2, 3, 6, 10];

    const submit = () => {
        console.log(props.props);
        props.move();
        var log=1;
        localStorage.setItem('logged',log.toString());
        history.replace('/home');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
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
                                <AITextField sm={12} name="email" label="邮箱"/>
                                <AITextField sm={12} name="password" label="密码" type="password"/>
                                <AIPickerField sm={6} name="name" array={ages} label="label"/>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                onClick={submitForm}
                                className={classes.submit}
                            >
                                登陆
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );


}


