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
import Message from "../commen/Message";

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
    const [message, setMessage] = React.useState({
        open: false,
        text: '',
        type: 'warning'
    });
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

    const callback = (data) => {
        console.log(data)
        if (data.status !== 0){
            setMessage({
                text: data.msg,
                type: 'error',
                open: true
            });
            return;
        }
        console.log(data.data.user, data.data.token)
        setMessage({
            text: data.msg,
            type: 'success',
            open: true
        })
        props.onLogin(data.data.user, data.data.token)
        history.push('/home');
    }

    const submit = (values) => {
        console.log(values);
        userService.register(values, callback)
    }


    const validate = values => {
        const errors = {};

        // username
        if (!values.username) { errors.username = '用户名不能为空！';}
        else if (values.username.length > 20) { errors.username = '用户名不能大于20位！';}

        // password
        if (!values.password) { errors.password = '密码不能为空！';}
        else if (!/^[0-9a-zA-Z]{6,20}$/i.test(values.password)) {
            errors.password = '密码由6-20位的字母和数字组成！';}

        // nickname
        if (!values.nickname) { errors.nickname = '昵称不能为空！';}

        // email
        if (!values.email) { errors.email = '邮箱不能为空！';}
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        // address
        if (!values.address) { errors.address = '地址不能为空！';}

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
                    注册账号
                </Typography>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        nickname: '',
                        sex: 0,
                        email: '',
                        address: ''
                    }}
                    validate={validate}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
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
                                <AITextField sm={12} name="email" label="邮箱" type="email"/>
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}/>
                                <Grid item xs={12} sm={8}>
                                    <Button href="/" color="primary">go back to home</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <Message
                messageOpen={message.open}
                handleClose={() => setMessage({open:false})}
                type={message.type}
                text={message.text}
            />
        </Container>
    );
}

export default connect(
    null,
    mapDispatchToProps
)(RegisterForm)
