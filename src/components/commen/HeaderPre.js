import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import LoginForm from "../signIn/LoginForm";
import TestSearchBar from "./TestSearchBar";
import Tooltip from '@material-ui/core/Tooltip';
import Logo from "./Logo";
import {withStyles} from "@material-ui/styles";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = ((theme) => ({
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
    }
}));

@withStyles(styles)
class HeaderPre extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            modalOpen: false
        }
    }

    handleModalOpen = () => this.setState({modalOpen: true});

    handleModalClose = () => this.setState({modalOpen: false});

    handleMenuOpen = (event) => this.setState({anchorEl: event.currentTarget});

    handleMenuClose = () => this.setState({anchorEl: null});

    handleSignUp = () => {
        this.handleMenuClose();
        this.props.history.push('/register');
    };

    handleSignIn = () => {
        this.handleMenuClose();
        this.handleModalOpen();
    };

    render() {
        const {history, classes} = this.props;

        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id="sign-menu"
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleSignUp}>注册</MenuItem>
                <MenuItem onClick={this.handleSignIn}>登陆</MenuItem>
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <Logo title="Amoy Interest"/>
                        <TestSearchBar history={history}/>
                        <div className={classes.blank}/>
                        <div className={classes.sectionDesktop}>
                            <Tooltip title="登陆">
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="sign-menu"
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <LoginForm closeModal={this.handleModalClose}/>
                    </div>
                </Modal>
            </div>
        );
    }


}

export default HeaderPre;
