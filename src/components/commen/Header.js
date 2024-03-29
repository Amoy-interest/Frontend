import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CameraIcon from '@material-ui/icons/Camera';
import {useHistory} from 'react-router-dom';
import Avatar1 from "../../assets/avatar1.jpeg";
import Avatar from "@material-ui/core/Avatar";
import ExploreIcon from '@material-ui/icons/Explore';
import Tooltip from '@material-ui/core/Tooltip';
import * as userService from "../../service/UserService";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import {connect} from "react-redux";
import {UserType} from "../../utils/constants";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";

const useStyles = makeStyles((theme) => ({
    grow: {
        width: '100%',
        flexGrow: 1,
        zIndex: 1,
        opacity: 0.70,
        //position:'fixed'
    },
    blank: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
    }
}));

function mapStateToProps(state) {
    return {
        role: state.userReducer.role
    }
}

function Header(props) {
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

    const handleProfile = () => {
        handleMenuClose();
        history.replace('/personal-info');
    };

    const handleLogout = () => {
        handleMenuClose();
        userService.logout();
        history.replace('/');
    };

    const openPostsView = () => {
        handleMenuClose();
        history.replace('/posts');
    };

    const openHomeView = () => {
        handleMenuClose();
        history.replace('/home');
    };

    const openUsersManageView = () => {
        handleMenuClose();
        history.replace('/users-manage');
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="personal-info-menu"
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {props.role === UserType.CUSTOMER ?
                <MenuItem onClick={handleProfile}>个人资料</MenuItem> : null}
            <MenuItem onClick={handleLogout}>退出登陆</MenuItem>

        </Menu>
    );

    const handleSearch = (keyword) => {
        console.log(keyword);
        props.handleSearch(keyword);
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Logo title={'Amoy Interest'}/>
                    <SearchBar handleSearch={handleSearch}/>
                    <div className={classes.blank}/>
                    {props.role === UserType.CUSTOMER ?
                        <Tooltip title="发现">
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={openPostsView}
                            >
                                <ExploreIcon/>
                            </IconButton>
                        </Tooltip> :
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
                    }
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
                                aria-controls="personal-info-menu"
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
    mapStateToProps,
    null
)(Header)
