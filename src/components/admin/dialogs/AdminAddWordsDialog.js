import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {addSenseWord} from "../../../service/AdminService";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../../utils/constants";
import TextField from "@material-ui/core/TextField";

export default class AdminAddWordsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            keyword:null
        };
        PubSub.subscribe(MsgType.ADMIN.ADD_SENSE_WORD, (msg, data) => {
            this.setState({open: true, keyword: data});
        });
    }

    handleAddChange = (e) => {
        this.setState({keyword: e.target.value});
    };

    cancel = () => {
        this.setState({open: false});
    };

    confirmAdd = () => {
        this.setState({open: false});
        let data = {keyword: this.state.keyword}
        console.log(data);
        addSenseWord(data,(res)=>{
            console.log(res);
            if (res.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {text: "添加失败！", type: MessageType.ERROR});
            else {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "添加成功！", type: MessageType.SUCCESS});
                this.props.updateSenseWords(0, 10);
            }
            this.setState({newWord:null,oldWord:null});
        })
    };

    render() {
        const {open} = this.state;
        return (
            <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
                <DialogTitle id="form-dialog-title">添加敏感词</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请输入新的敏感词
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
