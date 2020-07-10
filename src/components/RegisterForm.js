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
import { Formik, Form, Field } from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField, AICheckField, AIPickerField} from "./basic/AIField";


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

export default function SignUp(props){
    const classes = useStyles();
    const history = useHistory();

    const submit = () => {
        console.log(props.props)
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
                    注册账号
                </Typography>
                <Formik
                    initialValues={{
                        lastName: '',
                        firstName: '',
                        email: '',
                        password: '',
                        check: false
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
                                <AITextField sm={6} name="lastName" label="姓"/>
                                <AITextField sm={6} name="firstName" label="名"/>
                                <AITextField sm={12} name="email" label="邮箱"/>
                                <AITextField sm={12} name="password" label="密码" type="password"/>
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
                                提交信息
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );


}


