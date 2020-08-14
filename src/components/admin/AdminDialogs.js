import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {InputAdornment, TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {forbidReportedUser} from "../../service/AdminService";

export default class forbidUserDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.showForbidDialog,
            user_id: this.props.user_id,
            year:0,
            day:0,
            hour:0
        }
    }

    cancelForbid = () => {
        this.setState({open: false});
    };

    confirmForbid = () => {
        this.setState({open: false});
        this.props.submitForbid();//change state of parent's state:showForbidDialog
        let forbidTime = this.state.year * 365 *86400 + this.state.day * 86400 + this.state.hour * 3600;
        let data = {"user_id": this.state.userId, "time": forbidTime};
        //console.log(data);
        forbidReportedUser(data, ((res)=> {
            //console.log(res.data);
            this.props.updateUsers(0, 10);
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
        const {open}=this.state;
        return(
            <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs"
                    fullWidth="true">
                <DialogTitle id="form-dialog-title">封号</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请填写封号时长
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
                    <Button onClick={this.cancelForbid} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.confirmForbid} color="primary">
                        确认封号
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
