import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {
    unBanReportedUser,unForbidReportedUser
} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";

const Type = {
    UNBAN: 'unban',
    PERMIT: 'permit'
};

export default class AdminPermitUserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userId: null,
            type: Type.UNBAN,
        };

        PubSub.subscribe(MsgType.ADMIN.UNBAN_USR, (msg, data) => {
            this.setState({open: true, userId: data, type: Type.UNBAN});
        });
        PubSub.subscribe(MsgType.ADMIN.PERMIT_USR, (msg, data) => {
            this.setState({open: true, userId: data, type: Type.PERMIT});
        });
    }

    cancel = () => {
        this.setState({open: false, userId: null});
    };

    confirm = (values) => {
        this.setState({open: false});
        let data = {"user_id": this.state.userId};

        if (this.state.type === Type.UNBAN) this.unBanUser(data);
        else this.permitUser(data);
    };

    unBanUser = (data) => {
        unBanReportedUser(data, ((res)=> {
            console.log(res);
            if(res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "解禁失败！", type: MessageType.ERROR});
            else
                PubSub.publish(MsgType.SET_MESSAGE, {text: "解禁成功！", type: MessageType.SUCCESS});
        }))
    };

    permitUser = (data) => {
        unForbidReportedUser(data, ((res)=> {
            console.log(res);
            if(res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "解封失败！", type: MessageType.ERROR});
            else
                PubSub.publish(MsgType.SET_MESSAGE, {text: "解封成功！", type: MessageType.SUCCESS});
        }))
    };

    render() {
        const {open, type} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">操作确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {type === Type.UNBAN ? "确认解禁该用户？" : "确认解封该用户？"}
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
