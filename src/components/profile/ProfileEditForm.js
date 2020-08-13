import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AIPickerField, AITextField} from "../commen/AIField";
import {withStyles} from "@material-ui/styles";
import PostImage from "../post/PostImage";
import Uploader from "../commen/Uploader";
import OssApi from "../../service/OssService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import PubSub from "pubsub-js";
import {MsgType} from "../../utils/constants";
import Avatar from "@material-ui/core/Avatar";
import {connect} from "react-redux";

const style = ((theme) => ({
    form: {
        height: 500,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: 100,
        height: 100,
        // marginBottom:10,
        // marginLeft:45
    },
    spacing: {
        height: theme.spacing(6)
    },
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
const sex = [
    {
        value: 0,
        name: "女"
    },
    {
        value: 1,
        name: "男"
    }
];

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        role: state.userReducer.role
    }
}

@withStyles(style)
class ProfileEditForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            avatar: props.user.avatar,
            isUploading: false
        }
    };

    componentWillMount(){
        PubSub.subscribe(MsgType.ERROR_UPLOAD, (msg, data) => {
            PubSub.publish(MsgType.SET_MESSAGE, {open: true, text: "上传图片失败：" + data, type: 'error'});
            this.setState({isUploading: false});
        });
    }

    submit = async (values) => {
        this.setState({isUploading: true});
        if (this.state.file === null) values.avatar = this.state.avatar;
        else {
            let data = await oss.putObject(this.state.file);
            if (data.res.status !== 200){
                PubSub.publish(MsgType.SET_MESSAGE, {open: true, text: "上传图片失败", type: 'error'});
                return ;
            }
            values.avatar = data.url;
        }
        this.setState({isUploading: false});

        console.log("values", values);
        this.props.submit(values);
    };

    uploadFiles = (files, images) => {
        this.setState({
            file: files[0],
            avatar: images[0]
        });
    };

    render(){
        const {user, classes} = this.props;
        return (
            <Container component="main" maxWidth="lg">
                <Backdrop className={classes.backdrop} open={this.state.isUploading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Formik
                    initialValues={{
                        address: user.address,
                        introduction: user.introduction,
                        sex: user.sex
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
                            <div className={classes.form}>
                            <Avatar aria-label="profile" className={classes.avatar} src={this.state.avatar}/>
                            <div className={classes.spacing}/>
                            <Grid container spacing={3}>
                                <AITextField sm={8} name="address" multiline label="地址"/>
                                <AIPickerField sm={4} name="sex" label="性别" array={sex}/>
                                <AITextField sm={12} name="introduction" multiline label="个人介绍"/>
                                <Grid item xs={12} sm={8}/>
                                <Grid item xs={12} sm={1}>
                                    <Uploader uploadFiles={this.uploadFiles} limits={1}/>
                                </Grid>
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
                            </Grid>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
        );
    }


}

export default connect(
    mapStateToProps, null
)(ProfileEditForm);
