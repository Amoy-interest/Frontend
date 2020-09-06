import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PubSub from "pubsub-js";
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField} from "../commen/AIField";
import {withStyles} from "@material-ui/styles";
import {forwardPost, makePost} from "../../service/PostService";
import {MessageType, MsgType, PostType} from "../../utils/constants";
import Uploader from "../commen/Uploader";
import OssApi from "../../service/OssService";
import PostImage from "./PostImage";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopicSearchBar from "./TopicSearchBar";
import {List, ListItem} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const styles = ((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom:theme.spacing(1),
        marginTop:theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    imgContainer: {
        height: 100

    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    topics:{
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
            topics:[],
            isUploading: false
        };
        PubSub.subscribe(MsgType.ERROR_UPLOAD, (msg, data) => {
            PubSub.publish(MsgType.SET_MESSAGE, {open: true, text: data, type: 'error'});
            this.setState({isUploading: false});
        });
    }

    submitOwn = async (values, resetForm) => {
        this.setState({isUploading: true});

        let urls = await oss.putObjects(this.state.fileList);
        makePost(values.content, urls, this.state.topics, (data) => {
            console.log("callback_own", data);
            this.setState({isUploading: false});
            if (data.status === 402){
                PubSub.publish(MsgType.SET_MESSAGE, {text: data.msg, type: MessageType.ERROR});
            }
            else if (data.status !== 200) {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "发博失败！", type: MessageType.ERROR});
            }
            else {
                // clear form and upload
                resetForm();
                this.setState({fileList: [],images: []});
                PubSub.publish(MsgType.CLEAR_UPLOAD, null);

                // send messages and display new post
                PubSub.publish(MsgType.SET_MESSAGE, {text: "发博成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADD_POST, data.data);
            }
        });
    };

    submitForward = (values) => {
        const callbackForward = (data) => {
            console.log("callback_forward", data);

            // close modal
            this.props.closeModal();

            if (data.status === 402)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "该博文含有敏感词！发博失败！", type: MessageType.ERROR});
            else if (data.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "转发失败！", type: MessageType.ERROR});
            else {
                // send messages and display new post
                PubSub.publish(MsgType.SET_MESSAGE, {text: "转发成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADD_POST, null);
            }
        };
        forwardPost(this.props.postId, values.content, callbackForward);
    };

    addTopic=(topic)=>{
        this.setState({topics:[...this.state.topics,topic]})
    };

    uploadFiles = (files, images) => {
        this.setState({
            fileList: files,
            images: images
        });
    };

    handleDelete=(index)=>{
        let arr = this.state.topics;
        arr.splice(index, 1);
        this.setState({topics: arr});
    };

    render() {
        const classes = this.props.classes;
        const type = this.props.type ? this.props.type : PostType.OWN;
        const tag = this.props.tag ? this.props.tag : '';

        return (
            <Container component="main" maxWidth="lg">
                <Backdrop className={classes.backdrop} open={this.state.isUploading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Paper elevation={type === PostType.OWN? 3: 0} className={classes.paper}>
                    <Formik
                        initialValues={{
                            content: '',
                            tag: tag
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                // resetForm();
                                if(this.props.type === PostType.FORWARD)
                                    this.submitForward(values);
                                else this.submitOwn(values,resetForm);
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting, handleReset }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <AITextField sm={type === PostType.OWN ? 8:12} name="content" label="博文内容" multiline/>
                                    {
                                        type === PostType.OWN ?
                                            //<AITextField sm={3} name="tag" label="标签" multiline/>
                                            <Grid item xs={4}>
                                                <TopicSearchBar add={this.addTopic}/>
                                            </Grid>
                                            : null
                                    }
                                    {this.state.topics.length===0?null:
                                        //<Grid item xs={12}>
                                            <List className={classes.topics}>
                                                {this.state.topics.map((item, index) => {
                                                    return (
                                                        <ListItem key={index}>
                                                            <Chip
                                                                className={classes.chip}
                                                                label={item}
                                                                color="primary"
                                                                onDelete={()=>this.handleDelete(index)}
                                                            />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        //</Grid>
                                    }
                                    <Grid item xs={12} sm={12}>
                                        {/*<div className={classes.imgContainer}>*/}
                                            <PostImage image={this.state.images}/>
                                        {/*</div>*/}
                                    </Grid>
                                    <Grid item xs={12} sm={8}/>
                                    <Grid item xs={12} sm={4}>
                                        <div className={classes.buttons}>
                                            {
                                                type === PostType.OWN ?
                                                    <Uploader uploadFiles={this.uploadFiles}/>
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
