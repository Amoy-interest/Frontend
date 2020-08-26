import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CameraIcon from '@material-ui/icons/Camera';
import {Link} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import ExploreIcon from '@material-ui/icons/Explore';
import Tooltip from '@material-ui/core/Tooltip';
import * as userService from "../../service/UserService";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import {connect} from "react-redux";
import {UserType} from "../../utils/constants";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {amber} from "@material-ui/core/colors";
import TestSearchBar from "./TestSearchBar";
import {withStyles} from "@material-ui/styles";
import Background from "../../assets/img/background6.png";

const styles = ((theme) => ({
    grow: {
        width: '100%',
        flexGrow: 1,
        zIndex: 1,
        opacity: 0.85,
        //marginLeft:theme.spacing(6)
        //position:'fixed'
    },
    bar:{
        backgroundImage: `url(${Background})`,
        height:'8vh',
        display:'flex',
        justifyContent:'center',
        //padding:theme.spacing(1)
        //flexDirection:'row',
        //opacity: 0.70,
        //alignItems:'center'
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
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    }
}));

function mapStateToProps(state) {
    return {
        role: state.userReducer.role,
        user: state.userReducer
    }
}

@withStyles(styles)
class Header extends React.Component{

    handleLogout = () => {
        userService.logout();
        this.props.history.replace('/');
    };

    openPostsView = () => {
        this.props.history.replace('/posts');
    };

    openHomeView = () => {
        this.props.history.replace('/home');
    };

    openUsersManageView = () => {
        this.props.history.replace('/users-manage');
    };

    handleSearch = (keyword) => {
        console.log(keyword);
        this.props.handleSearch(keyword);
    };

    render() {
        const {classes, role, user} = this.props;

        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar className={role === UserType.ADMIN?null:classes.bar}>
                        {role === UserType.ADMIN?
                            <Logo title={'Amoy Interest Management'}/>:
                            <Logo title={'Amoy Interest'}/>}
                            <TestSearchBar history={this.props.history}/>
                        <div className={classes.blank}/>
                        {role === UserType.CUSTOMER ?
                            <Tooltip title="发现">
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.openPostsView}
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
                                    onClick={this.openUsersManageView}
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
                                onClick={this.openHomeView}
                            >
                                <CameraIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="退出">
                            <IconButton
                                edge="start"
                                aria-label="exit"
                                onClick={this.handleLogout}
                                className={classes.menuButton}
                                color="inherit"
                            >
                                <ExitToAppIcon/>
                            </IconButton>
                        </Tooltip>
                        <Link style={{color: amber[200], fontSize: '18px'}} to={{
                            pathname: '/personal-info',
                            search: '?id=' + user.user.user_id,
                        }}>
                            <div className={classes.sectionDesktop}>
                                <Tooltip title="个人">
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls="personal-info-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <Avatar className={classes.avatar} src={user.user.avatar}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default connect(
    mapStateToProps,
    null
)(Header)
