import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Message(props) {
    return(
        <Snackbar open={props.messageOpen} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.type}>
                {props.text}
            </Alert>
        </Snackbar>
    );
}
