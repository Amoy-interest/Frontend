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
import {AITextField, AICheckField, AIPickerField} from "../commen/AIField";
import {setToken, setUser} from "../../redux/actions";
import {connect} from "react-redux";
import * as userService from "../../service/UserService";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    commentText: {
        color: 'black',
        fontSize: 'small',
        textDecoration: 'none'
    }
}));

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (user, token) => {
            dispatch(setUser(user));
            dispatch(setToken(token));
        }
    }
}

function RegisterForm(props){
    const classes = useStyles();
    const history = useHistory();

    const callback = (data) => {
        console.log(data)
        props.onLogin(data.data.user, data.data.token)
        history.push('/home');
    }

    const submit = (values) => {
        console.log(values);
        userService.register(values, callback)
    }

    const sex = [
        {
            value: 0,
            name: "女"
        },
        {
            value: 1,
            name: "男"
        }
    ]


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    注册账号
                </Typography>
                <Formik
                    initialValues={{
                        username: null,
                        nickname: '',
                        password: null,
                        sex: 0,
                        email: '',
                        address: ''
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            alert(JSON.stringify(values, null, 2));
                            submit(values);
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <AITextField sm={12} name="username" label="用户名"/>
                                <AITextField sm={12} name="password" label="密码" type="password"/>
                                <AITextField sm={6} name="nickname" label="昵称"/>
                                <AIPickerField sm={6} name="sex" label="性别" array={sex}/>
                                <AITextField sm={12} name="email" label="邮箱"/>
                                <AITextField sm={12} name="address" label="地址"/>
                                <AICheckField sm={12} name="check" label="I would love to receive recommendation"/>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                onClick={submitForm}
                                className={classes.submit}
                            >
                                注册并登陆
                            </Button>
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
)(RegisterForm)
