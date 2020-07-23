import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import {getReportedUsers, banReportedUser, forbidReportedUser, getReportedPosts} from "../../service/AdminService";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {InputAdornment} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '130px',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default class AdminUsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            checked: [],
            open: [],
            creditsOrder: "desc",
            checkAll: false,
            showBanDialog: false,
            showForbidDialog: false,
            year: 0,
            day: 0,
            hour: 0,
            userId: -1,
            page: 0,
            rowsPerPage: 10,
            totalLength: 0
        };
    }

    componentDidMount() {
        const params = {
            pageNum: 0,
            pageSize: 10
        };
        getReportedUsers(params, ((res) => {
            console.log(res.data);
            for (let i=0; i<res.data.list.length; i++)
                this.state.checked.push(false);
            this.setState({
                users: res.data.list,
                totalLength: res.data.total
            });
        }));
    }

    updateUsers(page, rowsPerPage) {
        const params = {
            pageNum: page,
            pageSize: rowsPerPage
        };
        getReportedUsers(params, ((res) => {
            console.log(res.data);
            this.setState({
                users: res.data.list,
                totalLength: res.data.total
            });
        }));
    };

    handleChangePage = (e, newPage) => {
        this.setState({page: newPage});
        this.updateUsers(newPage, this.state.rowsPerPage);
    };

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: parseInt(e.target.value, 10),
            page: 0
        });
        this.updateUsers(0, parseInt(e.target.value, 10));
    };

    sortByCredits = () => {
        let tmp = this.state.users;
        tmp.sort((a, b) => {
            if (this.state.creditsOrder === "desc") {
                this.setState({creditsOrder: "asc"});
                return b.credits - a.credits;
            } else {
                this.setState({creditsOrder: "desc"});
                return a.credits - b.credits;
            }
        })
    };

    setChecked(index) {
        let tmp = this.state.checked;
        tmp[index] = tmp[index] !== true;
        this.setState({checked: tmp});
    };

    setCheckAll() {
        let tmp = this.state.checked;
        for (let i=0; i<tmp.length; i++) {
            tmp[i] = !this.state.checkAll;
        }
        this.setState({
            checkAll: !this.state.checkAll,
            checked: tmp
        });
    }

    cancelBan = () => {
        this.setState({showBanDialog: false});
    };

    confirmBan = () => {
        this.setState({showBanDialog: false});
        let banTime = this.state.year * 365 *86400 + this.state.day * 86400 + this.state.hour * 3600;
        let data = {"user_id": this.state.userId, "time": banTime};
        console.log(data);
        banReportedUser(data, ((res)=> {
            console.log(res.data);
        }))
    };

    cancelForbid = () => {
        this.setState({showForbidDialog: false});
    };

    confirmForbid = () => {
        this.setState({showForbidDialog: false});
        let forbidTime = this.state.year * 365 *86400 + this.state.day * 86400 + this.state.hour * 3600;
        let data = {"user_id": this.state.userId, "time": forbidTime};
        console.log(data);
        forbidReportedUser(data, ((res)=> {
            console.log(res.data);
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
        return (
            <div>
                <div style={{marginTop:'30px',marginBottom:'30px'}}>
                    <Button variant="contained" color="secondary">
                        禁言所选用户
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>
                        封号所选用户
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell onClick={() => this.setCheckAll()}>
                                    全选
                                </StyledTableCell>
                                <StyledTableCell>用户</StyledTableCell>
                                <StyledTableCell onClick={this.sortByCredits}>信用值</StyledTableCell>
                                <StyledTableCell>举报原因</StyledTableCell>
                                <StyledTableCell> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.users.map((user, index) => {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                <Checkbox
                                                    edge="start"
                                                    checked={this.state.checked[index]}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    onChange={() => this.setChecked(index)}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>{user.nickname}</StyledTableCell>
                                            <StyledTableCell>{user.credits}</StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(index)}>
                                                    {this.state.open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                                低俗，暴力，色情
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Tooltip title={"禁言"} onClick={() => {this.setState({showBanDialog: true, userId: user.user_id})}}>
                                                    <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                        <BlockIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"封号"} onClick={() => {this.setState({showForbidDialog: true, userId: user.user_id})}}>
                                                    <IconButton edge="end" aria-label="micoff">
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={3}
                                    count={this.state.totalLength}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.showBanDialog} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true">
                    <DialogTitle id="form-dialog-title">禁言</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请填写禁言时长
                        </DialogContentText>
                        <form noValidate autoComplete="off">
                                <TextField  onChange={this.handleYearChange}  variant="outlined" style={{marginLeft: '8px', width: 100}} InputProps={{
                                    endAdornment: <InputAdornment position="start">年</InputAdornment>,
                                }}/>
                                <TextField  onChange={this.handleDayChange}  variant="outlined" style={{marginLeft: '8px', width: 100}} InputProps={{
                                    endAdornment: <InputAdornment position="start">天</InputAdornment>,
                                }}/>
                                <TextField  onChange={this.handleHourChange} variant="outlined" style={{marginLeft: '8px', width: 100}}  InputProps={{
                                    endAdornment: <InputAdornment position="start">时</InputAdornment>,
                                }}/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelBan} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.confirmBan} color="primary">
                            确认禁言
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.showForbidDialog} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true">
                    <DialogTitle id="form-dialog-title">封号</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请填写封号时长
                        </DialogContentText>
                        <form noValidate autoComplete="off">
                            <TextField  onChange={this.handleYearChange} variant="outlined" style={{marginLeft: '8px', width: 100}} InputProps={{
                                endAdornment: <InputAdornment position="start">年</InputAdornment>,
                            }}/>
                            <TextField  onChange={this.handleDayChange} variant="outlined" style={{marginLeft: '8px', width: 100}} InputProps={{
                                endAdornment: <InputAdornment position="start">天</InputAdornment>,
                            }}/>
                            <TextField  onChange={this.handleHourChange} variant="outlined" style={{marginLeft: '8px', width: 100}}  InputProps={{
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
            </div>
        );
    }
}
