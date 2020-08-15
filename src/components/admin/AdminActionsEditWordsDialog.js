import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {editSenseWord} from "../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";
import TextField from "@material-ui/core/TextField";

export default class AdminActionsEditWordsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            oldWord: null,
            newWord: null
        };
        PubSub.subscribe(MsgType.ADMIN.EDIT_SENSE_WORD, (msg, data) => {
            this.setState({open: true, oldWord: data});
        });
    }

    handleUpdateChange = (e) => {
        this.setState({newWord: e.target.value});
    };

    cancel = () => {
        this.setState({open: false});
    };

    confirmUpdate = () => {
        this.setState({open: false});
        let data = {newWord: this.state.newWord,oldWord: this.state.oldWord}
        //console.log(data);
        editSenseWord(data,(res)=>{
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "编辑失败！", type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "编辑成功！", type: MessageType.SUCCESS});
                this.props.updateSenseWords(0, 10);
            }
            this.setState({newWord:null,oldWord:null});
        })
    };

    render() {
        const {open} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true">
                <DialogTitle id="form-dialog-title">Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请编辑该敏感词
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        defaultValue={this.state.oldWord}
                        onChange={this.handleUpdateChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancel} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.confirmUpdate} color="primary">
                        确认更新
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
