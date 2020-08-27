import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {unBanReportedUser, unForbidReportedUser} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";

const Type = {
    FORBID: 'forbid',
    BAN: 'ban'
};

export default class AdminUserUnManageDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user_id: null,
            type: Type.FORBID,
        };

        PubSub.subscribe(MsgType.ADMIN.UN_BAN_USR, (msg, data) => {
            this.setState({open: true, user_id: data, type: Type.BAN});
        });
        PubSub.subscribe(MsgType.ADMIN.UN_FORBID_USR, (msg, data) => {
            this.setState({open: true, user_id: data, type: Type.FORBID});
        });
    }

    cancel = () => {
        this.setState({open: false});
    };

    confirm = () => {
        this.setState({open: false});

        if (this.state.type === Type.BAN) this.unBan();
        else this.unForbid();
    };

    unBan = () => {
        unBanReportedUser(this.state.user_id, ((res) => {
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: res.msg, type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "解禁用户成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADMIN.REFRESH_TABLE, null);
            }
            this.setState({user_id: null});
        }))
    };

    unForbid = () => {
        unForbidReportedUser(this.state.user_id, ((res) => {
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: res.msg, type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "解封用户成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADMIN.REFRESH_TABLE, null);
            }
            this.setState({user_id: null});
        }))
    };

    render() {
        const {open, type} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">操作确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {type === Type.BAN ? "确认解禁该用户？" : "确认解封该用户？"}
                    </DialogContentText>
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
