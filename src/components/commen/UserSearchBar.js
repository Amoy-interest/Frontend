import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import React, {useState} from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import {useHistory} from "react-router";

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
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
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
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    }
}));

const UserSearchBar = (props) => {
    const classes = useStyles();
    const [keyword, setKeyword] = useState(null);
    const history=useHistory();
    const handleChange = (e) => {
        console.log(e.target.value);
        setKeyword(e.target.value);
    };

    const goto=()=>{
        if(keyword)
            history.push('/search',{keyword:keyword});
    };
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon} onClick={goto.bind(this)}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="发现更精彩的世界"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                fullWidth={true}
                inputProps={{'aria-label': 'search'}}
                onChange={handleChange}
            />
        </div>
    );
};
export default UserSearchBar;
