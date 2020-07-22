import React, {Component}from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {getReportedTopics, checkReportedTopic} from "../../service/AdminService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import {putRequest_json} from "../../utils/ajax";

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
            checkAll: false
        };
    }

    componentDidMount() {
        getReportedTopics(((res) => {
            for (let i=0; i<res.data.list.length; i++)
                this.state.checked.push(false);
            this.setState({topics: res.data.list});
        }));
    }

    checkTopic(name, status) {
        let data = {"topic_name": name, "check_status": status};
        console.log(data);
        checkReportedTopic(data, ((res) => {
            console.log(res);
        }))
    }

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
                    <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>
                        调整话题位置
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
                                            <StyledTableCell>{topic.name}</StyledTableCell>
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
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
