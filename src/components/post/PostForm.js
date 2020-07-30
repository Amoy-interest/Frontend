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
import Upload from "../commen/Upload";
import OssApi from "../../service/OssService";
import PostImage from "./PostImage";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = ((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom:theme.spacing(1),
        marginTop:theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}));
const oss = new OssApi();

@withStyles(styles)
class PostForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            images: [],
            isUploading: false
        };
    }

    submitOwn = async (values, resetForm) => {
        this.setState({isUploading: true});

        let urls = await oss.putObjects(this.state.fileList);
        console.log(urls);
        makePost(values.content, urls, (data) => {
            console.log("callback_own", data);
            if (data.status !== 200) PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: data.msg, type: 'warning'});
            else {
                resetForm();
                this.setState({images: [], isUploading: false});
                PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: data.msg, type: 'success'});
                PubSub.publish(MsgType.ADD_POST, data.data);
            }
        });
    };

    submitForward = (values, resetForm) => {

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

    uploadFiles = (files, images) => {
        this.setState({
            fileList: files,
            images: images
        });
    };

    render() {
        const classes = this.props.classes;
        const type = this.props.type ? this.props.type : PostType.OWN;

        return (
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Backdrop className={classes.backdrop} open={this.state.isUploading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Paper elevation={type === PostType.OWN? 3: 0} className={classes.paper}>
                    <Formik
                        initialValues={{
                            content: ''
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                // resetForm();
                                if(this.props.type === PostType.FORWARD)
                                    this.submitForward(values, resetForm);
                                else this.submitOwn(values, resetForm);
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting, handleReset }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <AITextField sm={12} name="content" label="博文内容" multiline/>
                                    <Grid item xs={12} sm={12}>
                                        <PostImage image={this.state.images}/>
                                    </Grid>
                                    <Grid item xs={12} sm={8}/>
                                    <Grid item xs={12} sm={4}>
                                        <div className={classes.buttons}>
                                            {
                                                type === PostType.OWN ?
                                                    <Upload uploadFiles={this.uploadFiles}/>
                                                    : null
                                            }
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
                                        </div>

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
