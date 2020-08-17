import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { MemoryRouter } from 'react-router';
import SettingsIcon from '@material-ui/icons/Settings';

const breadcrumbNameMap = {
    '/users-manage': '用户管理',
    "/users-manage/ban":'禁言封号',
    '/users-manage/cancel_ban':'解除禁言',
    '/users-manage/cancel_forbid':'解除封号',
    '/posts-manage': '博文管理',
    '/topics-manage': '话题管理',
    '/sensWords-manage': '敏感词管理',
};

function ListItemLink(props) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    return (
        <li>
            <ListItem button to={to} {...other} >
                <ListItemIcon ><SettingsIcon color='primary'/></ListItemIcon>
                <Link href={to}>
                    <ListItemText primary={primary} />
                </Link>
                {open != null ? open ? <ExpandLess style={{marginLeft:'8px'}} /> : <ExpandMore style={{marginLeft:'8px'}}/> : null}
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    open: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 190,
        //marginTop:theme.spacing(1),
        fontSize:'16px'
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
        //marginTop: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
        fontSize:'14px'
    },
}));

export default function RouterBreadcrumbs() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <MemoryRouter initialEntries={['/posts-manage']} initialIndex={0}>
            <div className={classes.root}>
                <nav className={classes.lists} aria-label="mailbox folders">
                    <List>
                        <ListItemLink to="/users-manage" open={open} onClick={handleClick} />
                        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemLink to="/users-manage/ban" className={classes.nested} />
                                <ListItemLink to="/users-manage/cancel_ban" className={classes.nested} />
                                <ListItemLink to="/users-manage/cancel_forbid" className={classes.nested} />
                            </List>
                        </Collapse>
                        <ListItemLink to="/posts-manage" />
                        <ListItemLink to="/topics-manage" />
                        <ListItemLink to="/sensWords-manage"/>
                    </List>
                </nav>
            </div>
        </MemoryRouter>
    );
}

