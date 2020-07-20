import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form} from 'formik';
import {AITextField} from "../commen/AIField";

export default function CommentForm(props){

    const submit = () => {
        console.log(props.props)
    }

    return (
        <Container component="main" maxWidth="lg">
            <Formik
                initialValues={{
                    comment: ''
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
                    <Form>
                        <Grid container spacing={1}>
                            <AITextField sm={10} name="comment" label="评论"/>
                            <Grid item xs sm={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    className={props.style.submit}
                                >
                                    确定发布
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}


