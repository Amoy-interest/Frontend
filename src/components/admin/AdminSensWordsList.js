import React, {Component} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import {getSensWords} from '../../service/AdminService';
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
            checkAll: false
        };
    }

    componentDidMount() {
        getSensWords(((res) => {
            console.log(res.data);
            for (let i=0; i<res.data.length; i++)
                this.state.checked.push(false);
            this.setState({sensWords: res.data});
        }));
    }

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
        const { classes } = this.props;
        return (
            <div>
                <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <Button variant="contained" color="secondary">
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
                                                    <Tooltip title={"删除"}>
                                                        <IconButton edge="end" aria-label="micoff">
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={"编辑"}>
                                                        <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    <Checkbox
                                                        edge="start"
                                                        checked={this.state.checked.indexOf(index) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>{
                                                    index+1 < this.state.sensWords.length ? this.state.sensWords[index+1].keyword : ""
                                                }</StyledTableCell>
                                                <StyledTableCell>
                                                    <Tooltip title={"删除"}>
                                                        <IconButton edge="end" aria-label="micoff">
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={"编辑"}>
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
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withStyles(useStyles)(AdminSensWordsList);


