import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";
import {fade} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from "react-redux";
import {MsgType, UserType} from "../../utils/constants";
import PubSub from "pubsub-js";
import withStyles from "@material-ui/core/styles/withStyles";
import {getPreTopicSearch} from "../../service/SearchService";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const styles = ((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.55),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.65),
        },
        //marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100px',
        height: '50px',
        [theme.breakpoints.up('sm')]: {
            //marginLeft: theme.spacing(3),
            //width: 'auto',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline'
    },
    searchIcon: {
        //padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4
    },
    inputRoot: {
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: theme.spacing(1.5, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '14ch',
        },
    },
    avatar: {
        width: 30,
        height: 30
    }
}));

function mapStateToProps(state) {
    return {
        role: state.userReducer.role,
    }
}

@withStyles(styles)
class TopicSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            inputValue: '发现更精彩的世界',
            keywords: []
        };
        //this.goto = this.goto.bind(this);
    }

    handleChange = (event, newInputValue) => {
        this.setState({keyword: newInputValue, inputValue: newInputValue})
        const params = {
            pageNum: 0,
            pageSize: 4,
            keyword: newInputValue
        };
        const callback = (data) => {
            console.log(data);
            this.setState({keywords: data.data.list});
            console.log(this.state.keywords);
        }
        if (params.keyword !== '' && this.props.role !== UserType.VISITOR)
            getPreTopicSearch(params, callback);
    };

    goto = () => {
        if (this.props.role === UserType.VISITOR) {
            PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: "请先登陆", type: 'warning'
            });
            return;
        } else if (this.state.keyword) {
            console.log(this.props);
            this.props.history.push({pathname: '/search', state: {keyword: this.state.keyword}});
            this.setState({inputValue: ''});
        }
    };

    render() {
        const {classes} = this.props;
        const {inputValue, keywords} = this.state;

        // const options = keywords.map((option) => {
        //     return {
        //         type: '相关博文',
        //         ...option,
        //     };
        // });
        // const userOptions = keywords.map((option) => {
        //     return {
        //         type: '相关用户',
        //         ...option,
        //     };
        // });

        const options = keywords;

        return (
            <div className={classes.search}>
                <div>
                    <Autocomplete
                        inputValue={inputValue}
                        onInputChange={this.handleChange}
                        freeSolo
                        id="search"
                        disableClearable
                        options={options.sort((a, b) => -b.localeCompare(a))}
                        //groupBy={(option) => option.type}
                        getOptionLabel={(option) => option}
                        renderOption={(option) => (
                            <React.Fragment>
                                <IconButton color="primary" aria-label="add" size={'small'} onClick={()=>{this.props.add(option)}}>
                                    <AddCircleOutlineOutlinedIcon/>
                                </IconButton>
                                <Typography variant="subtitle2" style={{marginLeft: '3px'}}>{option}</Typography>
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className={
                                    classes.input
                                }
                                placeholder="搜索标签"
                                variant="standard"
                                size="small"
                                InputProps={{...params.InputProps, type: 'search', style: {height: '30px'}}}
                            />
                        )}
                    />
                </div>
                <div className={classes.searchIcon} onClick={this.goto.bind(this)}>
                    <SearchIcon/>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    null
)(TopicSearchBar)
