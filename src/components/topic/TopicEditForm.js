import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AITextField} from "../commen/AIField";
import {withStyles} from "@material-ui/styles";
import PostImage from "../post/PostImage";
import Uploader from "../commen/Uploader";
import OssApi from "../../service/OssService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import PubSub from "pubsub-js";
import {MsgType} from "../../utils/constants";

const style = ((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    submit: {
        // width: 90,
        height: 54,
        marginLeft: theme.spacing(1)
    }
}));
const oss = new OssApi();

@withStyles(style)
class TopicEditForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            image: [props.image],
            isUploading: false
        }
    };

    componentWillMount(){
        PubSub.subscribe(MsgType.ERROR_UPLOAD, (msg, data) => {
            PubSub.publish(MsgType.SET_MESSAGE, {open: true, text: data, type: 'error'});
            this.setState({isUploading: false});
        });
    }

    submit = async (values) => {
        this.setState({isUploading: true});
        if (this.state.file === null) values.url = this.state.image[0];
        else values.url = await oss.putObject(this.state.file);
        this.setState({isUploading: false});

        console.log("values", values);
        this.props.submit(values);
    };

    uploadFiles = (files, images) => {
        this.setState({
            file: files[0],
            image: images
        });
    };

    render(){
        const {text, classes} = this.props;
        return (
            <Container component="main" maxWidth="lg">
                <Backdrop className={classes.backdrop} open={this.state.isUploading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Formik
                    initialValues={{
                        text: text
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            this.submit(values);
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form style={{marginBottom:'20px',marginTop:'20px'}}>
                            <Grid container spacing={1}>
                                <AITextField sm={9} name="text" multiline label="博文"/>
                                <Grid item xs sm={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                        className={classes.submit}
                                    >
                                        确定更改
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <PostImage image={this.state.image}/>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Uploader uploadFiles={this.uploadFiles} limits={1}/>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        );
    }


}

export default TopicEditForm;
