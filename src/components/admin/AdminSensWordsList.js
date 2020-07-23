import React, {Component} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import {getSensWords, postSensWord, putSensWord, deleteSensWord} from '../../service/KeyWordService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import {getReportedTopics} from "../../service/AdminService";

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

class AdminSensWordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensWords: [],
            checked: [],
            checkAll: false,
            showAddDialog: false,
            showEditDialog: false,
            showDeleteDialog: false,
            oldWord: null,
            newWord: null,
            deleteWord: null,
            page: 0,
            rowsPerPage: 20,
            totalLength: 0
        };
    }

    componentDidMount() {
        const params = {
            pageNum: 0,
            pageSize: 20
        };
        getSensWords(params, ((res) => {
            console.log(res.data.list);
            for (let i=0; i<res.data.list.length; i++)
                this.state.checked.push(false);
            this.setState({
                sensWords: res.data.list,
                totalLength: res.data.total
            });
        }));
    }

    updateSensWords(page, rowsPerPage) {
        const params = {
            pageNum: page,
            pageSize: rowsPerPage
        };
        getSensWords(params, ((res) => {
            console.log(res.data);
            this.setState({
                sensWords: res.data.list,
                totalLength: res.data.total
            });
        }));
    };

    handleChangePage = (e, newPage) => {
        this.setState({page: newPage});
        this.updateSensWords(newPage, this.state.rowsPerPage);
    };

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: parseInt(e.target.value, 10),
            page: 0
        });
        this.updateSensWords(0, parseInt(e.target.value, 10));
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

    handleAddChange = (e) => {
        this.setState({newWord: e.target.value});
    };

    handleUpdateChange = (e) => {
        this.setState({newWord: e.target.value});
    };

    cancelAdd = () => {
        this.setState({showAddDialog: false});
    };

    cancelUpdate = () => {
        this.setState({showEditDialog: false});
    };

    cancelDelete = () => {
        this.setState({showDeleteDialog: false});
    };

    confirmDelete = () => {
        this.setState({showDeleteDialog: false});
        let data = "?keyword=" + this.state.deleteWord.toString();
        deleteSensWord(data, (res) => {
            console.log(res.data);
        })
    };

    confirmAdd = () => {
        this.setState({showAddDialog: false});
        let data = "?keyword=" + this.state.newWord.toString();
        postSensWord(data, ((res) => {
            console.log(res.data);
        }));
    };

    confirmUpdate = () => {
        this.setState({showEditDialog: false});
        let data = "?oldWord=" + this.state.oldWord.toString() + "&newWord=" + this.state.newWord.toString();
        console.log(data);
        putSensWord(data, ((res) => {
            console.log(res.data);
        }));
    };

    handleAdd = () => {
        this.setState({showAddDialog: true});
    };

    handleUpdate (index) {
        this.setState({
            showEditDialog: true,
            oldWord: this.state.sensWords[index].keyword
        });
    };

    handleDelete (index) {
        this.setState({
            showDeleteDialog: true,
            deleteWord: this.state.sensWords[index].keyword
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <Button variant="contained" color="secondary" onClick={this.handleAdd}>
                        添加敏感词
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>
                        删除所选敏感词
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell onClick={() => this.setCheckAll()}>
                                    全选
                                </StyledTableCell>
                                <StyledTableCell>敏感词</StyledTableCell>
                                <StyledTableCell> </StyledTableCell>
                                <StyledTableCell onClick={() => this.setCheckAll()}>
                                    全选
                                </StyledTableCell>
                                <StyledTableCell>敏感词</StyledTableCell>
                                <StyledTableCell> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.sensWords.map((sensWord, index) => {
                                    if (!(index&1)) {
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
                                                <StyledTableCell>{sensWord.keyword}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Tooltip title={"删除"} onClick={() => {this.handleDelete(index)}}>
                                                        <IconButton edge="end" aria-label="micoff">
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={"编辑"} onClick={() => {this.handleUpdate(index)}}>
                                                        <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    <Checkbox
                                                        edge="start"
                                                        checked={this.state.checked[index+1]}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        onChange={() => this.setChecked(index+1)}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>{
                                                    index+1 < this.state.sensWords.length ? this.state.sensWords[index+1].keyword : ""
                                                }</StyledTableCell>
                                                <StyledTableCell>
                                                    <Tooltip title={"删除"} onClick={() => {this.handleDelete(index+1)}}>
                                                        <IconButton edge="end" aria-label="micoff">
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={"编辑"} onClick={() => {this.handleUpdate(index+1)}}>
                                                        <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    }
                                })
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 50]}
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
                <Dialog open={this.state.showAddDialog} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true">
                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
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
                        <Button onClick={this.cancelAdd} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.confirmAdd} color="primary">
                            确认添加
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.showEditDialog} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true">
                    <DialogTitle id="form-dialog-title">Update</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请编辑该敏感词
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            defaultValue={this.state.oldWord}
                            onChange={this.handleUpdateChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelUpdate} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.confirmUpdate} color="primary">
                            确认更新
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.showDeleteDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            是否确认删除该敏感词:{this.state.deleteWord}
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
        )
    }
}

export default withStyles(useStyles)(AdminSensWordsList);


