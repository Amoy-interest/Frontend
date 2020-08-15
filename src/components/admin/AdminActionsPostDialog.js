import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {checkReportedBlog} from "../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";

const Type = {
    PASS: 'pass',
    DELETE: 'delete'
};

export default class AdminActionsPostDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            blogId: null,
            type: Type.PASS,
        };

        PubSub.subscribe(MsgType.ADMIN.PASS_POST, (msg, data) => {
            this.setState({open: true, blogId: data, type: Type.PASS});
        });
        PubSub.subscribe(MsgType.ADMIN.DELETE_POST, (msg, data) => {
            this.setState({open: true, blogId: data, type: Type.DELETE});
        });
    }

    cancel = () => {
        this.setState({open: false});
    };

    confirm = () => {
        this.setState({open: false});

        if (this.state.type === Type.PASS) this.passPost();
        else this.deletePost();
    };

    passPost = () => {
        let data = {"blog_id": this.state.blogId, "check_status": 1};
        checkReportedBlog(data, ((res) => {
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "通过失败！", type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "已通过！", type: MessageType.SUCCESS});
                this.props.updatePost(0, 10);
            }
            this.setState({blogId: null});
        }))
    };

    deletePost = () => {
        let data = {"blog_id": this.state.blogId, "check_status": 2};
        checkReportedBlog(data, ((res) => {
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "删除失败！", type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "已删除！", type: MessageType.SUCCESS});
                this.props.updatePost(0, 10);
            }
            this.setState({blogId: null});
        }))
    };

    render() {
        const {open, type} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">操作确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {type === Type.PASS ? "是否确认该博文并无违规" : "是否确认删除该博文"}
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
