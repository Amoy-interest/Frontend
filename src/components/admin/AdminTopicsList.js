import React, {Component}from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {getReportedTopics, checkReportedTopic, searchReportedTopics} from "../../service/AdminService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import {Link} from "react-router-dom";

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

export default class AdminTopicsList extends Component{

    //const classes = useStyles();
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            open: [],
            checked: [],
            reportOrder: "desc",
            checkAll: false,
            showPassDialog: false,
            showDeleteDialog: false,
            topicName: null,
            page: 0,
            rowsPerPage: 10,
            totalLength: 0,
            keyword: null
        };
    }

    componentDidMount() {
        const params = {
            pageNum: 0,
            pageSize: 10
        };
        getReportedTopics(params, ((res) => {
            for (let i=0; i<res.data.list.length; i++)
                this.state.checked.push(false);
            this.setState({
                topics: res.data.list,
                totalLength: res.data.total
            });
        }));
    }

    componentWillReceiveProps(nextProps) {
        console.log("topic page finally get keyword");
        this.setState({keyword: nextProps.keyword}, () => {
            this.updateTopics(0, 10);
        });
    }

    updateTopics(page, rowsPerPage) {
        if (this.state.keyword === null) {
            const params = {
                pageNum: page,
                pageSize: rowsPerPage
            };
            getReportedTopics(params, ((res) => {
                console.log(res.data);
                this.setState({
                    topics: res.data.list,
                    totalLength: res.data.total
                });
            }));
        } else {
            const params = {
                keyword: this.state.keyword,
                pageNum: page,
                pageSize: rowsPerPage
            };
            searchReportedTopics(params, ((res) => {
                console.log(res.data);
                this.setState({
                    topics: res.data.list,
                    totalLength: res.data.total
                });
            }));
        }
    };

    handleChangePage = (e, newPage) => {
        this.setState({page: newPage});
        this.updateTopics(newPage, this.state.rowsPerPage);
    };

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: parseInt(e.target.value, 10),
            page: 0
        });
        this.updateTopics(0, parseInt(e.target.value, 10));
    };

    checkTopic(name, status) {
        if (status === 1) {
            this.setState({showPassDialog: true});
        } else this.setState({showDeleteDialog: true});
        this.setState({topicName: name});
    }

    cancelDelete = () => {
        this.setState({showDeleteDialog: false});
    };

    confirmDelete = () => {
        this.setState({showDeleteDialog: false});
        let data = {"topic_name": this.state.topicName, "check_status": 2};
        checkReportedTopic(data, ((res) => {
            console.log(res);
            this.updateTopics(0, 10);
        }))
    };

    cancelPass = () => {
        this.setState({showPassDialog: false});
    };

    confirmPass = () => {
        this.setState({showPassDialog: false});
        let data = {"topic_name": this.state.topicName, "check_status": 1};
        checkReportedTopic(data, ((res) => {
            console.log(res);
            this.updateTopics(0, 10);
        }))
    };

    sortByReport = () => {
        let tmp = this.state.topics;
        tmp.sort((a, b) => {
            if (this.state.reportOrder === "desc") {
                this.setState({reportOrder: "asc"});
                return b.report_count - a.report_count;
            } else {
                this.setState({reportOrder: "desc"});
                return a.report_count - b.report_count;
            }
        });
        this.setState({topics: tmp});
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

    render() {
        return (
            <div>
                <div style={{marginTop:'30px',marginBottom:'30px'}}>
                    <Button variant="contained" color="secondary">
                        删除所选话题
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell onClick={() => this.setCheckAll()}>
                                    全选
                                </StyledTableCell>
                                <StyledTableCell>话题</StyledTableCell>
                                <StyledTableCell>创建时间</StyledTableCell>
                                <StyledTableCell onClick={this.sortByReport}>举报数</StyledTableCell>
                                <StyledTableCell> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.topics.map((topic, index) => {
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
                                            <StyledTableCell>
                                                <Link style={{color: 'black'}}  to={{
                                                    pathname: '/topic-discussion',
                                                    search: '?topic_name=' + topic.name,
                                                }} >{topic.name}</Link>
                                            </StyledTableCell>
                                            <StyledTableCell>{topic.time}</StyledTableCell>
                                            <StyledTableCell>{topic.report_count}</StyledTableCell>
                                            <StyledTableCell>
                                                <Tooltip title={"通过"} onClick={() => {this.checkTopic(topic.name, 1)}}>
                                                    <IconButton edge="end" aria-label="micoff">
                                                        <DoubleArrowIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={"删除"} onClick={() => {this.checkTopic(topic.name, 2)}}>
                                                    <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={4}
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
                <Dialog open={this.state.showPassDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Pass</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            是否确认该话题并无违规:<br/>{this.state.topicName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelPass} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.confirmPass} color="primary">
                            确认通过
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.showDeleteDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            是否确认删除该话题:<br/>{this.state.topicName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelDelete} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.confirmDelete} color="primary">
                            确认删除
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
