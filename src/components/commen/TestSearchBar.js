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
import {getPreSearch} from "../../service/SearchService";
import Avatar from "@material-ui/core/Avatar";
import Icon from '@material-ui/core/Icon';
import {Link} from "react-router-dom";

const styles = ((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.55),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.65),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '500px',
        height: '45px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
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
        //marginBottom:'10px',
    },
    input: {
        padding: theme.spacing(1, 2, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
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
class TestSearchBar extends React.Component {
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
            pageNum: 1,
            pageSize: 4,
            keyword: newInputValue
        };
        const callback = (data) => {
            console.log(data);
            this.setState({keywords: data.data.list});
            console.log(this.state.keywords);
        }
        if (params.keyword !== '' && this.props.role !== UserType.VISITOR)
            getPreSearch(params, callback);
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

        const blogOptions = keywords.map((option) => {
            return {
                type: '相关博文',
                ...option,
            };
        });
        const userOptions = keywords.map((option) => {
            return {
                type: '相关用户',
                ...option,
            };
        });

        const options = [...blogOptions, ...userOptions];

        return (
            <div className={classes.search}>
                <div className={classes.searchIcon} onClick={this.goto.bind(this)}>
                    <SearchIcon/>
                </div>
                <div>
                    <Autocomplete
                        inputValue={inputValue}
                        onInputChange={this.handleChange}
                        freeSolo
                        id="search"
                        disableClearable
                        options={options.sort((a, b) => -b.type.localeCompare(a.type))}
                        groupBy={(option) => option.type}
                        getOptionLabel={(option) => option.user.nickname}
                        renderOption={(option) => (
                            option.type === '相关用户' ?
                                <React.Fragment>
                                    <Link style={{color: '#ffff', fontSize: '18px'}} to={{
                                        pathname: '/personal-info',
                                        search: '?id=' + option.user.user_id,
                                    }}>
                                        <Icon
                                            aria-label="account of current user"
                                            color="inherit"
                                        >
                                            <Avatar className={classes.avatar} src={option.user.avatar}/>
                                        </Icon>
                                    </Link>
                                        <Typography variant="subtitle2"style={{marginLeft: '8px'}}>{option.user.nickname}</Typography>
                                        <Typography variant="body2" style={{
                                            marginLeft: '4px',
                                            marginRight: '2px',
                                            fontSize: '10px'
                                        }}>粉丝: {option.userCount.fan_count}</Typography>
                                </React.Fragment> :
                                <Typography variant="subtitle2" style={{marginLeft: '6px'}}>{option.user.nickname}</Typography>

                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className={
                                    classes.input
                                }
                                placeholder="发现更精彩的世界"
                                variant="standard"
                                size="small"
                                InputProps={{...params.InputProps, type: 'search', style: {height: '30px'}}}
                            />
                        )}
                    />
                </div>
            </div>
        );
    }
}

// const keywords = [
//     {title: '最强之鲁迅', type: '用户'},
//     {title: 'Binnie', type: '用户'},
//     {title: 'Boz', type: '用户'},
//     {title: '大蒜', type: '用户'},
//     {title: 'Mok', type: '用户'},
//     {title: "hello", type: '博文'},
//     {title: 'test', type: '博文'},
//     {title: '高考加油', type: '博文'},
//     {title: 'test2', type: '博文'},
// ];

export default connect(
    mapStateToProps,
    null
)(TestSearchBar)
