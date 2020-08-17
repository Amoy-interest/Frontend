import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {deleteSenseWord} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";

export default class AdminDeleteWordsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            keyword:null
        };
        PubSub.subscribe(MsgType.ADMIN.DELETE_SENSE_WORD, (msg, data) => {
            this.setState({open: true, keyword: data});
        });
    }


    cancel = () => {
        this.setState({open: false});
    };

    confirmDelete = () => {
        this.setState({open: false});
        let data = {keyword:this.state.keyword}
        //console.log(data);
        deleteSenseWord(data,(res)=>{
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "删除敏感词失败！", type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "删除敏感词成功！", type: MessageType.SUCCESS});
                PubSub.publish(MsgType.ADMIN.REFRESH_TABLE, null);
            }
            this.setState({keyword: null});
        })
    };

    render() {
        const {open} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">删除确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        是否确认删除该敏感词:{this.state.keyword}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.confirmDelete} color="primary">
                        确认删除
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
