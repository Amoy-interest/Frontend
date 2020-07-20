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
            checked: []
        };
    }

    componentDidMount() {
        getReportedPosts(((res) => {
            console.log(res.data);
            this.setState({posts: res.data});
        }));
    }

    setOpen (index) {
        //console.log(this.state.open[index]);
        let tmp = this.state.open;
        if (this.state.open[index] === undefined) tmp[index] = false;
        else tmp[index] = !tmp[index];
        //console.log(tmp[index]);
        this.setState({open: tmp});
        //不知道为什么一直都是整列的修改！！！！
    }

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
                                <StyledTableCell>选中</StyledTableCell>
                                <StyledTableCell>发帖人</StyledTableCell>
                                <StyledTableCell>博文内容</StyledTableCell>
                                <StyledTableCell>热度</StyledTableCell>
                                <StyledTableCell>举报数</StyledTableCell>
                                <StyledTableCell> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        this.state.posts.map((blog, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checked.indexOf(index) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{blog.nickname}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen({index})}>
                                            {this.state.open[{index}] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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


