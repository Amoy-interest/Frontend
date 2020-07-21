import React, {Component} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import {getReportedPosts} from '../../service/AdminService';
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
import BlockIcon from '@material-ui/icons/Block';
import Collapse from '@material-ui/core/Collapse';
import PostCard from "../post/PostCard";

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
    /*root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },*/
}))(TableRow);

const useStyles = makeStyles({
    table: {
        maxWidth: 1000
    },
});

class AdminPostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            open: [],
            checked: [],
            reportOrder: "desc",
            hotOrder: "desc",
            checkAll: false
        };
    }

    componentDidMount() {
        getReportedPosts(((res) => {
            console.log(res.data);
            for (let i=0; i<res.data.length; i++) {
                this.state.open.push(false);
                this.state.checked.push(false);
            }
            this.setState({posts: res.data});
        }));
    }

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
        for (let i=0; i<tmp.length; i++) {
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
                return b.blog_count.vote_count+b.blog_count.comment_count+b.blog_count.forward_count -
                    a.blog_count.vote_count - a.blog_count.comment_count - a.blog_count.forward_count;
            } else {
                this.setState({hotOrder: "desc"});
                return a.blog_count.vote_count+a.blog_count.comment_count+a.blog_count.forward_count -
                    b.blog_count.vote_count - b.blog_count.comment_count - b.blog_count.forward_count;
            }
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <Button variant="contained" color="secondary">
                        屏蔽所选博文
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>
                        删除所选博文
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell onClick={() => this.setCheckAll()}>
                                    全选
                                </StyledTableCell>
                                <StyledTableCell>发帖人</StyledTableCell>
                                <StyledTableCell>博文内容</StyledTableCell>
                                <StyledTableCell onClick={this.sortByHot}>热度</StyledTableCell>
                                <StyledTableCell onClick={this.sortByReportCount}>举报数</StyledTableCell>
                                <StyledTableCell> </StyledTableCell>
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
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>{blog.nickname}</StyledTableCell>
                                        <StyledTableCell>
                                            <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(index)}>
                                                {this.state.open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                            {blog.blog_content.text}
                                        </StyledTableCell>
                                        <StyledTableCell>{blog.blog_count.forward_count + blog.blog_count.comment_count + blog.blog_count.vote_count}</StyledTableCell>
                                        <StyledTableCell>{blog.blog_count.report_count}</StyledTableCell>
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
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}> </TableCell>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                            <Collapse in={this.state.open[index]} timeout="auto" unmountOnExit>
                                                <PostCard post={blog} index={0}/>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withStyles(useStyles)(AdminPostsList);


