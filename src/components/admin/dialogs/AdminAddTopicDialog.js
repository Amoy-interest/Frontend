import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {addTopic} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import TextField from "@material-ui/core/TextField";

export default class AdminAddTopicDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            topic: ""
        };
        PubSub.subscribe(MsgType.ADMIN.ADD_TOPIC, () => {
            this.setState({open: true});
        });
    }

    handleAddChange = (e) => {
        this.setState({topic: e.target.value});
    };

    cancel = () => {
        this.setState({open: false});
    };

    confirmAdd = () => {
        if (this.state.topic === "" || this.state.topic === null) return;
        this.setState({open: false});
        let data = {topic_name: this.state.topic};
        console.log(data);
        addTopic(data,(res)=>{
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "添加话题失败！", type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "添加话题成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADMIN.REFRESH_TABLE, null);
            }
        })
    };

    render() {
        const {open} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
                <DialogTitle id="form-dialog-title">添加话题</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请输入新的话题
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        onChange={this.handleAddChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.confirmAdd} color="primary">
                        确认添加
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
