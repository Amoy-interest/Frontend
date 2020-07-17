import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CameraIcon from '@material-ui/icons/Camera';
import { useHistory } from 'react-router-dom';
import Avatar1 from "../../assets/postavatar.jpeg";
import Avatar from "@material-ui/core/Avatar";
import RedditIcon from "@material-ui/icons/Reddit";
import Tooltip from '@material-ui/core/Tooltip';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import {blue} from "@material-ui/core/colors";
import {removeToken, removeUser, setToken, setUser} from "../../redux/actions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    grow: {
        width:'100%',
        flexGrow: 1,
        zIndex:1,
        opacity: 0.70,
        backgroundColor:blue[100]
    },
    blank:{
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
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
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    paper: {
        position: 'absolute',
        // width: 400,
        // backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
    },
}));

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => {
            dispatch(removeUser());
            dispatch(removeToken());
        }
    }
}

function AdminHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // const handleProfile = () => {
    //     handleMenuClose();
    //     history.replace('/personal-info');
    // };

    const handleLogout = () => {
        handleMenuClose();
        props.onLogout();
        history.replace('/');
    };

    const openUsersManageView=()=>{
        handleMenuClose();
        history.replace('/users-manage');
    };

    const openHomeView=()=>{
        handleMenuClose();
        history.replace('/admin-home');
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/*<MenuItem onClick={handleProfile}>个人资料</MenuItem>*/}
            <MenuItem onClick={handleLogout}>退出登陆</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" >
                <Toolbar >
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <RedditIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Amoy Interest Management
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="请输入关键词"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            fullWidth={true}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className={classes.blank} />
                    <Tooltip title="管理">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openUsersManageView}
                        >
                            <TrackChangesIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="主页">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openHomeView}
                        >
                            <CameraIcon/>
                        </IconButton>
                    </Tooltip>

                    <div className={classes.sectionDesktop}>
                        <Tooltip title="个人">
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar className={classes.avatar} src={Avatar1}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

export default connect(
    null,
    mapDispatchToProps
)(AdminHeader)
