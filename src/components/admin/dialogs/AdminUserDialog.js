import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {InputAdornment, TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {banReportedUser, forbidReportedUser} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";

const Type = {
    BAN: 'ban',
    FORBID: 'forbid'
};

export default class AdminUserDialog extends React.Component{
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

    confirm = () => {
        this.setState({open: false});

        let time = this.state.year * 365 *86400 + this.state.day * 86400 + this.state.hour * 3600;
        let data = {"user_id": this.state.userId, "time": time};

        if (this.state.type === Type.BAN) this.BanUser(data);
        else this.ForbidUser(data);
    };

    BanUser = (data) => {
        banReportedUser(data, ((res)=> {
            console.log(res);
            if(res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "禁言失败！", type: MessageType.ERROR});
            else
                PubSub.publish(MsgType.SET_MESSAGE, {text: "禁言成功！", type: MessageType.SUCCESS});
        }))
    };

    ForbidUser = (data) => {
        forbidReportedUser(data, ((res)=> {
            console.log(res);
            if(res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "封号失败！", type: MessageType.ERROR});
            else
                PubSub.publish(MsgType.SET_MESSAGE, {text: "封号成功！", type: MessageType.SUCCESS});
        }))
    };

    handleYearChange = (e) => {
        this.setState({year: e.target.value});
    };

    handleDayChange = (e) => {
        this.setState({day: e.target.value});
    };

    handleHourChange = (e) => {
        this.setState({hour: e.target.value});
    };

    render() {
        const {open, type} = this.state;
        return(
            <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
                <DialogTitle id="form-dialog-title">{type === Type.BAN ? "禁言": "封号"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {type === Type.BAN ? "请填写禁言时长": "请填写封号时长"}
                    </DialogContentText>
                    <form noValidate autoComplete="off">
                        <TextField onChange={this.handleYearChange} variant="outlined"
                                   style={{marginLeft: '8px', width: 100}} InputProps={{
                            endAdornment: <InputAdornment position="start">年</InputAdornment>,
                        }}/>
                        <TextField onChange={this.handleDayChange} variant="outlined"
                                   style={{marginLeft: '8px', width: 100}} InputProps={{
                            endAdornment: <InputAdornment position="start">天</InputAdornment>,
                        }}/>
                        <TextField onChange={this.handleHourChange} variant="outlined"
                                   style={{marginLeft: '8px', width: 100}} InputProps={{
                            endAdornment: <InputAdornment position="start">时</InputAdornment>,
                        }}/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.confirm} color="primary">
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
