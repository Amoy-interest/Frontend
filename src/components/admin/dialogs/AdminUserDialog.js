import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {banReportedUser, forbidReportedUser} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import {Form, Formik} from "formik";
import {AITextField} from "../../commen/AIField";
import Grid from "@material-ui/core/Grid";

const Type = {
    BAN: 'ban',
    FORBID: 'forbid'
};

function getSeconds(time) {
    let nowDate = new Date();
    let string = nowDate.toISOString().substring(0,16);
    let afterDate = new Date(string);
    let pickDate = new Date(time);
    let seconds = (pickDate.getTime() - afterDate.getTime()) / 1000;
    console.log("getSeconds: ", seconds);
    return seconds;
}

class AdminUserDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userId: null,
            type: Type.BAN,
            year:0,
            day:0,
            hour:0
        };

        PubSub.subscribe(MsgType.ADMIN.FORBID_USR, (msg, data) => {
            this.setState({open: true, userId: data, type: Type.FORBID});
        });
        PubSub.subscribe(MsgType.ADMIN.BAN_USR, (msg, data) => {
            this.setState({open: true, userId: data, type: Type.BAN});
        });
    }

    cancel = () => {
        this.setState({open: false, userId: null});
    };

    confirm = (values) => {
        this.setState({open: false});
        let time = getSeconds(values.time);
        let data = {"user_id": this.state.userId, "time": time};

        if (this.state.type === Type.BAN) this.BanUser(data);
        else this.ForbidUser(data);
    };

    BanUser = (data) => {
        banReportedUser(data, ((res)=> {
            console.log(res);
            if(res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "禁言用户失败！", type: MessageType.ERROR});
            else{
                PubSub.publish(MsgType.SET_MESSAGE, {text: "禁言用户成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADMIN.REFRESH_TABLE, null);
            }
        }))
    };

    ForbidUser = (data) => {
        forbidReportedUser(data, ((res)=> {
            console.log(res);
            if(res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "封号用户失败！", type: MessageType.ERROR});
            else{
                PubSub.publish(MsgType.SET_MESSAGE, {text: "封号用户成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADMIN.REFRESH_TABLE, null);
            }
        }))
    };

    validate = values => {
        const errors = {};

        let nowDate = new Date();
        if (values.time < nowDate.toISOString()) errors.time = "时间不能早于当前时间！";

        return errors;
    };

    // handleYearChange = (e) => {
    //     this.setState({year: e.target.value});
    // };
    //
    // handleDayChange = (e) => {
    //     this.setState({day: e.target.value});
    // };
    //
    // handleHourChange = (e) => {
    //     this.setState({hour: e.target.value});
    // };

    render() {
        const {open, type} = this.state;
        const string = (new Date()).toISOString().substring(0,16);

        return(
            <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
                <Formik
                    initialValues={{
                        // time: '2017-05-24T10:30'
                        time: string
                    }}
                    validate={this.validate}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            this.confirm(values);
                        }, 500);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            <DialogTitle id="form-dialog-title">{type === Type.BAN ? "禁言": "封号"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {type === Type.BAN ? "请选择禁言时长：": "请选择封号时长："}
                                </DialogContentText>
                                <Grid container spacing={2}>
                                    <AITextField sm={12} name="time" label="时间" type='datetime-local'/>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.cancel} color="primary">
                                    取消
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                     color="primary">
                                    确认
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        );
    }
}

export default AdminUserDialog;
