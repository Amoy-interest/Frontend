import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import Paper from '@material-ui/core/Paper';
import {AITextField} from "../commen/AIField";
import Uploader from "../commen/Uploader";
import {withStyles} from "@material-ui/styles";
import {makePost} from "../../service/PostService";

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
        }

        this.uploadFiles = this.uploadFiles.bind(this);
    }

    submit = (values) => {
        let images = [];
        let files = this.state.fileList;
        for (let i = 0; i < files.length; ++i){
            images.push(files[i].base64);
        }

        const callback = (data) => {
            console.log(data);
            this.props.submit(data.data);
            // data display....
        };
        makePost(values.content, images, callback);
    };

    uploadFiles = (files) => {
        this.setState({fileList: files});
    };

    render() {
        const classes = this.props.classes;

        return (
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Formik
                        initialValues={{
                            content: ''
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                alert(JSON.stringify(values, null, 2));
                                this.submit(values);
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <AITextField sm={12} name="content" label="博文内容" multiline/>
                                    <Grid item xs={12} sm={12}>
                                        <Uploader uploadFiles={this.uploadFiles}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>
                                    <Grid item xs={12} sm={4}></Grid>
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
