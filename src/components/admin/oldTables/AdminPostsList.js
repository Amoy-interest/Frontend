import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import {
    banReportedUser,
    checkReportedBlog,
    forbidReportedUser,
    getReportedPosts,
    searchReportedPosts
} from '../../../service/AdminService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import PostCard from "../../post/PostCard";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {InputAdornment, TextField} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: '#000',
        fontSize:'16px',
        paddingTop:theme.spacing(3),
        paddingBottom:theme.spacing(3)
    },
    body: {
        fontSize: 14,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '130px',
        //padding:theme.spacing(1)
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    /*root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },*/
}))(TableRow);

class AdminPostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            open: [],
            checked: [],
            reportOrder: "desc",
            hotOrder: "desc",
            checkAll: false,
            showPassDialog: false,
            showDeleteDialog: false,
            blogId: null,
            page: 0,
            rowsPerPage: 10,
            totalLength: 0,
            keyword: null,
            showBanDialog: false,
            showForbidDialog: false,
        };
        this.handleBan = this.handleBan.bind(this);
        this.handleForbid = this.handleForbid.bind(this);
    }

    componentDidMount() {
        const params = {
            pageNum: 0,
            pageSize: 10
        };
        getReportedPosts(params, ((res) => {
            console.log(res.data);
            for (let i = 0; i < res.data.list.length; i++) {
                this.state.open.push(false);
                this.state.checked.push(false);
            }
            this.setState({
                posts: res.data.list,
                totalLength: res.data.total
            });
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("post page finally get keyword");
        this.setState({keyword: nextProps.keyword}, () => {
            this.updatePost(0, 10);
        });
    }

    updatePost(page, rowsPerPage) {
        if (this.state.keyword === null) {
            const params = {
                pageNum: page,
                pageSize: rowsPerPage
            };
            getReportedPosts(params, ((res) => {
                console.log(res.data);
                this.setState({
                    posts: res.data.list,
                    totalLength: res.data.total
                });
            }));
        } else {
            const params = {
                keyword: this.state.keyword,
                pageNum: page,
                pageSize: rowsPerPage
            };
            searchReportedPosts(params, ((res) => {
                console.log(res.data);
                this.setState({
                    posts: res.data.list,
                    totalLength: res.data.total
                });
            }));
        }
    };

    handleChangePage = (e, newPage) => {
        this.setState({page: newPage});
        this.updatePost(newPage, this.state.rowsPerPage);
    };

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: parseInt(e.target.value, 10),
            page: 0
        });
        this.updatePost(0, parseInt(e.target.value, 10));
    };

    setOpen(index) {
        let tmp = this.state.open;
        tmp[index] = tmp[index] !== true;
        this.setState({open: tmp});
    };

    setChecked(index) {
        let tmp = this.state.checked;
        tmp[index] = tmp[index] !== true;
        this.setState({checked: tmp});
    };

    setCheckAll() {
        let tmp = this.state.checked;
        for (let i = 0; i < tmp.length; i++) {
            tmp[i] = !this.state.checkAll;
        }
        this.setState({
            checkAll: !this.state.checkAll,
            checked: tmp
        });
    }

    sortByReportCount = () => {
        let tmp = this.state.posts;
        tmp.sort((a, b) => {
            if (this.state.reportOrder === "desc") {
                this.setState({reportOrder: "asc"});
                return b.blog_count.report_count - a.blog_count.report_count;
            } else {
                this.setState({reportOrder: "desc"});
                return a.blog_count.report_count - b.blog_count.report_count;
            }
        });
        this.setState({posts: tmp});
    };

    sortByHot = () => {
        let tmp = this.state.posts;
        tmp.sort((a, b) => {
            if (this.state.hotOrder === "desc") {
                this.setState({hotOrder: "asc"});
                return b.blog_count.vote_count + b.blog_count.comment_count + b.blog_count.forward_count -
                    a.blog_count.vote_count - a.blog_count.comment_count - a.blog_count.forward_count;
            } else {
                this.setState({hotOrder: "desc"});
                return a.blog_count.vote_count + a.blog_count.comment_count + a.blog_count.forward_count -
                    b.blog_count.vote_count - b.blog_count.comment_count - b.blog_count.forward_count;
            }
        })
    };

    checkBlog(blogId, status) {
        /*let data = {"topic_name": name, "check_status": status};
        console.log(data);
        checkReportedTopic(data, ((res) => {
            console.log(res);
        }))*/
        if (status === 1) {
            this.setState({showPassDialog: true});
        } else this.setState({showDeleteDialog: true});
        this.setState({blogId: blogId});
    }

    cancelDelete = () => {
        this.setState({showDeleteDialog: false});
    };

    confirmDelete = () => {
        this.setState({showDeleteDialog: false});
        let data = {"blog_id": this.state.blogId, "check_status": 2};
        checkReportedBlog(data, ((res) => {
            console.log(res);
            this.updatePost(0, 10);
        }))
    };

    cancelPass = () => {
        this.setState({showPassDialog: false});
    };

    confirmPass = () => {
        this.setState({showPassDialog: false});
        let data = {"blog_id": this.state.blogId, "check_status": 1};
        checkReportedBlog(data, ((res) => {
            console.log(res);
            this.updatePost(0, 10);
        }))
    };

    cancelBan = () => {
        this.setState({showBanDialog: false});
    };

    confirmBan = () => {
        this.setState({showBanDialog: false});
        let banTime = this.state.year * 365 * 86400 + this.state.day * 86400 + this.state.hour * 3600;
        let data = {"user_id": this.state.userId, "time": banTime};
        console.log(data);
        banReportedUser(data, ((res) => {
            console.log(res.data);
            //this.updateUsers(0, 10);
        }))
    };

    cancelForbid = () => {
        this.setState({showForbidDialog: false});
    };

    confirmForbid = () => {
        this.setState({showForbidDialog: false});
        let forbidTime = this.state.year * 365 * 86400 + this.state.day * 86400 + this.state.hour * 3600;
        let data = {"user_id": this.state.userId, "time": forbidTime};
        console.log(data);
        forbidReportedUser(data, ((res) => {
            console.log(res.data);
            //this.updateUsers(0, 10);
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

    handleBan(userId) {
        console.log(userId);
        this.setState({showBanDialog: true, userId: userId});
    };

    handleForbid(userId) {
        this.setState({showForbidDialog: true, userId: userId});
    };

    render() {
        return (
            <div>
                <TableContainer component={Paper} >
                    <Table aria-label="customized table" >
                        <TableHead color={"primary"}>
                            <TableRow>
                                <StyledTableCell style={{paddingLeft:'35px'}} onClick={() => this.setCheckAll()}>
                                    全选
                                </StyledTableCell>
                                <StyledTableCell>发帖人</StyledTableCell>
                                <StyledTableCell>博文内容</StyledTableCell>
                                <StyledTableCell onClick={this.sortByHot}>热度</StyledTableCell>
                                <StyledTableCell onClick={this.sortByReportCount}>举报数</StyledTableCell>
                                <StyledTableCell style={{paddingLeft:'30px'}}> 通过 删除</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.posts.map((blog, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row">
                                                    <Checkbox
                                                        edge="start"
                                                        checked={this.state.checked[index]}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        onChange={() => this.setChecked(index)}
                                                        style={{paddingLeft:'35px'}}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>{blog.nickname}</StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton aria-label="expand row" size="small"
                                                                onClick={() => this.setOpen(index)}>
                                                        {this.state.open[index] ? <KeyboardArrowUpIcon/> :
                                                            <KeyboardArrowDownIcon/>}
                                                    </IconButton>
                                                    {blog.blog_content.text}
                                                </StyledTableCell>
                                                <StyledTableCell>{blog.blog_count.forward_count + blog.blog_count.comment_count + blog.blog_count.vote_count}</StyledTableCell>
                                                <StyledTableCell>{blog.blog_count.report_count}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Tooltip title={"通过"} onClick={() => {
                                                        this.checkBlog(blog.blog_id, 1)
                                                    }}>
                                                        <IconButton edge="end" aria-label="micoff">
                                                            <DoubleArrowIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={"删除"} onClick={() => {
                                                        this.checkBlog(blog.blog_id, 2)
                                                    }}>
                                                        <IconButton edge="end" aria-label="ban"
                                                                    style={{marginLeft: '8px'}}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <TableRow>
                                                <TableCell style={{paddingBottom: 0, paddingTop: 0}}
                                                           colSpan={1}> </TableCell>
                                                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={4}>
                                                    <Collapse in={this.state.open[index]} timeout="auto" unmountOnExit>
                                                        <PostCard post={blog} index={0} handleBan={this.handleBan}
                                                                  handleForbid={this.handleForbid}/>
                                                    </Collapse>
                                                </TableCell>
                                                <TableCell style={{paddingBottom: 0, paddingTop: 0}}
                                                           colSpan={1}> </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    );
                                })}
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
                            是否确认该博文并无违规
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
                            是否确认删除该博文
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
                <Dialog open={this.state.showBanDialog} aria-labelledby="form-dialog-title" maxWidth="xs"
                        fullWidth="true">
                    <DialogTitle id="form-dialog-title">禁言</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请填写禁言时长
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
                        <Button onClick={this.cancelBan} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.confirmBan} color="primary">
                            确认禁言
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.showForbidDialog} aria-labelledby="form-dialog-title" maxWidth="xs"
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
            </div>
        )
    }
}

export default AdminPostsList;


