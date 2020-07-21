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
            creditsOrder: "desc"
        };
    }

    componentDidMount() {
        getReportedUsers(((res) => {
            console.log(res.data);
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
                               <StyledTableCell>选中</StyledTableCell>
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
                                                <Tooltip title={"屏蔽"}>
                                                    <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                        <BlockIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"删除"}>
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
            </div>
        );
    }
}
