import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import LoginForm from "../signIn/LoginForm";
import SearchBar from "./SearchBar";
import Tooltip from '@material-ui/core/Tooltip';
import Logo from "./Logo";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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

export default function HeaderPre() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const isMenuOpen = Boolean(anchorEl);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignUp = () => {
        handleMenuClose();
        history.push('/register');
    };

    const handleSignIn = () => {
        handleMenuClose();
        handleModalOpen();
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="sign-menu"
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSignUp}>注册</MenuItem>
            <MenuItem onClick={handleSignIn}>登陆</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Logo title="Amoy Interest"/>
                    <SearchBar/>
                    <div className={classes.blank}/>
                    <div className={classes.sectionDesktop}>
                        <Tooltip title="登陆">
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="sign-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Modal open={open} onClose={handleModalClose}>
                <div style={getModalStyle()} className={classes.paper}>
                    <LoginForm closeModal={handleModalClose}/>
                </div>
            </Modal>
        </div>
    );
}
