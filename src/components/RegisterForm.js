import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
// import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Paper from '@material-ui/core/Paper';

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
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            alert(JSON.stringify(values, null, 2));
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={classes.form}>
                            {/*{isSubmitting && <LinearProgress />}*/}
                            {/*<br />*/}

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="lastName"
                                        label="姓"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="firstName"
                                        label="名"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        // type="email"
                                        label="邮箱"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete="email@xx.com"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="password"
                                        type="password"
                                        label="密码"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete=""
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                fullWidth
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


{/*<Button*/}
{/*    type="btn"*/}
{/*    fullWidth*/}
{/*    variant="contained"*/}
{/*    color="primary"*/}
{/*    className={classes.submit}*/}
{/*    onClick={submit}*/}
{/*>*/}
{/*    Sign Up*/}
{/*</Button>*/}
{/*<Button*/}
{/*    fullWidth*/}
{/*    variant="contained"*/}
{/*    color="primary"*/}
{/*    className={classes.submit}*/}
{/*    onClick={submit}*/}
{/*>*/}
{/*    Sign Up*/}
{/*</Button>*/}
// <Grid container justify="flex-end">
//     <Grid item>
//         {/*<Link href="#" variant="body2">*/}
//         {/*    Already have an account? Sign in*/}
//         {/*</Link>*/}
//         <Typography className={classes.commentText} variant='caption' noWrap>
//             <a
//                 className={classes.commentText}
//                 href='/'
//             >
//                 Already have an account? Sign in                                </a>
//         </Typography>
//     </Grid>
// </Grid>
