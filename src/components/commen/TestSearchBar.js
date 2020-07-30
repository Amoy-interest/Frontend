import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {fade, makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {useHistory} from "react-router";
import {connect} from "react-redux";
import {MsgType, UserType} from "../../utils/constants";
import PubSub from "pubsub-js";

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '500px',
        height:'45px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        display:'flex',
        flexDirection:'column',
        alignItems:'baseline'
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
    }
}));

function mapStateToProps(state) {
    return {
        role: state.userReducer.role,
    }
}
function TestSearchBar(props) {
    const classes = useStyles();
    const [keyword, setKeyword] = useState(null);
    const history=useHistory();
    const [inputValue, setInputValue] = React.useState('发现更精彩的世界');

    const handleChange=(event, newInputValue) => {
        setInputValue(newInputValue);
        setKeyword(newInputValue);
    };

    const goto=()=>{
        if(props.role===UserType.VISITOR){
            PubSub.publish(MsgType.SET_MESSAGE, {
                open: true, text: "请先登陆", type: 'warning'
            });
            return;
        }
        else if(keyword) {
            setInputValue('');
            history.push('/search',{keyword:keyword});
        }
    };

    const options = keywords.map((option) => {
        const type = option.type;
        return {
            firstLetter: type,
            ...option,
        };
    });
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon} onClick={goto.bind(this)}>
                <SearchIcon/>
            </div>
            <div>
                <Autocomplete
                    inputValue={inputValue}
                    onInputChange={handleChange}
                    freeSolo
                    id="search"
                    disableClearable
                    options={options.sort((a, b) => -b.type.localeCompare(a.type))}
                    groupBy={(option) => option.type}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            className={
                                classes.input
                            }
                            //style={{height:'20px'}}
                            placeholder="发现更精彩的世界"
                            //margin="normal"
                            variant="standard"
                            size="small"
                            InputProps={{ ...params.InputProps, type: 'search',style:{height:'34px'} }}
                        />
                    )}
                />
            </div>
        </div>
    );
}

const keywords = [
    { title: '最强之鲁迅', type: '用户'},
    { title: 'Binnie', type: '用户' },
    { title: 'Boz', type: '用户' },
    { title: '大蒜', type: '用户' },
    { title: 'Mok', type: '用户'},
    { title: "hello", type: '博文' },
    { title: 'test', type: '博文' },
    { title: '高考加油', type: '博文' },
    { title: 'test2', type: '博文' },
];
export default connect(
    mapStateToProps,
    null
)(TestSearchBar)
