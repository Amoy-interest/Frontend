import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AITextField} from "./AIField";
import {makeStyles} from "@material-ui/core/styles";
import * as postService from "../../service/PostService";
import * as usrService from "../../service/UserService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    submit: {
        // width: 90,
        height: 54,
        marginLeft: theme.spacing(1)
    }
}));

const Type = {
    POST: "post",
    USER: "user"
};

export default function ReportForm(props){
    const classes = useStyles();

    const callback = (data) => {
        console.log(data);
        PubSub.publish(MsgType.REPORT_FINISHED, null);
        if (data.status === 200)
            PubSub.publish(MsgType.SET_MESSAGE, {
                type: MessageType.SUCCESS,
                text: props.type === Type.POST ? "举报博文成功！": "举报用户成功！"
            });
        else
            PubSub.publish(MsgType.SET_MESSAGE, {
                type: MessageType.ERROR,
                text: props.type === Type.POST ? "举报博文失败！": "举报用户失败！"
            });
    };

    const submit = (values) => {
        // props.submit(values);
        console.log(values);

        if (props.type === Type.POST)
            postService.reportPost(props.id, values.report_reason, callback);
        else
            usrService.reportUsr(props.id, values.report_reason, callback)
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
                            <AITextField sm={9} name="report_reason" multiline label="举报理由"/>
                            <Grid item xs sm={3}>
                                <Button
                                    className={classes.submit}
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


