import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField} from "../commen/AIField";
import * as userService from "../../service/UserService";
import {useHistory} from "react-router";
import {setToken, setUser} from "../../redux/actions";
import {connect} from "react-redux";
import PubSub from "pubsub-js";
import {MsgType} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        width:'350',
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

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (user, token) => {
            dispatch(setUser(user));
            dispatch(setToken(token));
        }
    }
}

function LoginForm(props){
    const classes = useStyles();
    const history = useHistory();

    const submit = (values) => {
        console.log(values);
        userService.login(values, (data) => {
            console.log(data);
            if (data.status !== 0) {
                console.log(data.msg);
                PubSub.publish(MsgType.SET_MESSAGE, {
                    open: true, text: data.msg, type: 'error'});
                return;
            }
            PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: data.msg, type: 'success'});
            props.onLogin(data.data.user, data.data.token);
            history.push('/home');
        });
        props.closeModal();
    };

    const validate = values => {
        const errors = {};

        // username
        if (!values.username) { errors.username = '用户名不能为空！';}
        else if (values.username.length > 20) { errors.username = '用户名不大于20位！';}

        // password
        if (!values.password) { errors.password = '密码不能为空！';}
        else if (!/^[0-9a-zA-Z]{6,20}$/i.test(values.password)) {
            errors.password = '密码由6-20位的字母和数字组成！';}

        return errors;
    };

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
                        username: '',
                        password: '',
                    }}
                    validate={validate}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            // alert(JSON.stringify(values, null, 2));
                            submit(values);
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <AITextField sm={12} name="username" label="用户名"/>
                                <AITextField sm={12} name="password" label="密码" type="password"/>
                                {/*<AIPickerField sm={6} name="name" array={ages} label="label"/>*/}
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Button onClick={props.closeModal} color="primary">Forgot password?</Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button href="/register" color="primary">Sign Up</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}

export default connect(
    null,
    mapDispatchToProps
)(LoginForm)



