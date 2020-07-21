import React, {Component} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import {getReportedUsers} from "../../service/AdminService";
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            showForbidDialog: false
        };
    }

    componentDidMount() {
        getReportedUsers(((res) => {
            console.log(res.data);
            for (let i=0; i<res.data.length; i++)
                this.state.checked.push(false);
            this.setState({users: res.data});
        }));
    }

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
    };

    cancelForbid = () => {
        this.setState({showForbidDialog: false});
    };

    confirmForbid = () => {
        this.setState({showForbidDialog: false});
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
                                                <Tooltip title={"禁言"} onClick={() => {this.setState({showBanDialog: true})}}>
                                                    <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                        <BlockIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"封号"} onClick={() => {this.setState({showForbidDialog: true})}}>
                                                    <IconButton edge="end" aria-label="micoff">
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.showBanDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">禁言</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请选择禁言时长
                        </DialogContentText>
                        <List>
                            <ListItem button>
                                <ListItemText>1小时</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>12小时</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>1天</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>7天</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>一个月</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>三个月</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>半年</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>一年</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>十年</ListItemText>
                            </ListItem>
                        </List>
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
                <Dialog open={this.state.showForbidDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">封号</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请选择封号时长
                        </DialogContentText>
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
