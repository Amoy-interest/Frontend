import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AITextField} from "../commen/AIField";
import {makeStyles} from "@material-ui/core/styles";
import * as postService from "../../service/PostService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    submit_primary: {
        // width: 90,
        height: 54,
        marginLeft: theme.spacing(1)
    },
    submit_secondary: {
        height: 40
    }
}));

export default function PostReportForm(props){
    const classes = useStyles();

    const submit = (values) => {
        // props.submit(values);
        console.log(values);
        postService.reportPost(props.id, values.report_reason, (data) => {
            console.log(data);
            PubSub.publish(MsgType.REPORT_FINISHED, null);
            if (data.status === 200)
                PubSub.publish(MsgType.SET_MESSAGE, {type: MessageType.SUCCESS, text: "举报成功！"});
            else
                PubSub.publish(MsgType.SET_MESSAGE, {type: MessageType.ERROR, text: "举报失败！"});
        })
    };

    return (
        <Container component="main" maxWidth="lg">
            <Formik
                initialValues={{
                    report_reason: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        submit(values);
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={1}>
                            <AITextField sm={9} name="report_reason" multiline label="举报内容"/>
                            <Grid item xs sm={3}>
                                <Button
                                    className={classes.submit_primary}
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    确定举报
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}


