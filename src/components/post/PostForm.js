import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PubSub from "pubsub-js";
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField} from "../commen/AIField";
import Uploader from "../commen/Uploader";
import {withStyles} from "@material-ui/styles";
import {forwardPost, makePost} from "../../service/PostService";
import {MsgType, PostType} from "../../utils/constants";

const styles = ((theme) => ({
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


@withStyles(styles)
class PostForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
    }

    submitOwn = (values) => {
        // let images = [];
        // let files = this.state.fileList;
        // for (let i = 0; i < files.length; ++i){
        //     images.push(files[i].base64);
        // }

        const callbackOwn = (data) => {
            console.log("callback_own", data);
            if (!data.status) PubSub.publish(MsgType.ADD_POST, data.data);
            else PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: data.msg, type: 'warning'});

        };
        makePost(values.content, this.state.fileList, callbackOwn);
    };

    submitForward = (values) => {

        const callbackForward = (data) => {
            console.log("callback_forward", data);

            // data display....
            this.props.closeModal();
            if (!data.status) this.props.submit(data.data);
            else PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: data.msg, type: 'warning'});
        };
        forwardPost(this.props.postId, values.content, 0, callbackForward);
    };

    render() {
        const classes = this.props.classes;
        const type = this.props.type ? this.props.type : PostType.OWN;

        return (
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Paper elevation={type === PostType.OWN? 3: 0} className={classes.paper}>
                    <Formik
                        initialValues={{
                            content: ''
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                resetForm();
                                if(this.props.type === PostType.FORWARD)
                                    this.submitForward(values);
                                else this.submitOwn(values);
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting, handleReset }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <AITextField sm={12} name="content" label="博文内容" multiline/>
                                    {/*<input sm={12} name="file" label="文件" type="file"/>*/}
                                    {
                                        type === PostType.OWN ?
                                            <Grid item xs={12} sm={12}>
                                                <Uploader uploadFiles={(files) => this.setState({fileList: files})}/>
                                            </Grid> : null
                                    }
                                    {/*<Grid item xs={12} sm={4}/>*/}
                                    {/*<Grid item xs={12} sm={4}/>*/}
                                    <Grid item xs={12} sm={9}/>
                                    <Grid item xs={12} sm={3}>
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
                                    </Grid>
                                </Grid>

                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        );
    }

}


export default PostForm;
