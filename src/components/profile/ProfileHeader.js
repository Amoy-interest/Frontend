import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar1 from "../../assets/commentavatar.jpeg";
import Avatar from "@material-ui/core/Avatar";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {amber, red} from '@material-ui/core/colors';
import Background from '../../assets/topicbackground.jpeg'
import Grid from "@material-ui/core/Grid";
import PostCardForm from "../PostCardForm";
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar2 from "../../assets/postavatar.jpeg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {useHistory} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: amber[100]
    },
    root: {
        width: '100%',
    },
    content: {
        paddingTop: 20
    },
    media: {
        height: 70,
        width: 120,
        //paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        width: 100,
        height: 100,
        marginLeft: 20
    },
    chip: {
        marginLeft: theme.spacing(2),
        marginBottom: 10
    }
}));

export default function ProfileHeader() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const isMenuOpen = Boolean(anchorEl);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleMenuClose();
        //handleExpandClick();
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
            <MenuItem onClick={handleEdit}><CreateIcon color='primary' />编辑</MenuItem>
        </Menu>
    );
    return (

        <Card className={classes.root}>
            <div className={classes.background}>
                <CardHeader
                    action={
                        <IconButton onClick={handleProfileMenuOpen} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent className={classes.content}>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs>
                            <Avatar aria-label="profile" className={classes.avatar} src={Avatar1}/>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" color="textPrimary" align='center'>
                        Binnie
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align='center'>
                        粉丝：3000 | 关注：4000
                    </Typography>
                    <div style={{marginTop: '10px'}}>
                    <Typography variant="body1" color="textPrimary" component="p" align='center'>
                        简介:淘兴趣首席排版大师
                    </Typography>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs>
                                <Button variant="contained" color="primary">
                                    关注
                                </Button>
                                <Button variant="contained" color="primary" style={{marginLeft: '8px'}}>
                                    私信
                                </Button>
                            </Grid>
                            <Grid item xs>
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
                {/*<CardActions disableSpacing>*/}
                {/*    <IconButton*/}
                {/*        className={clsx(classes.expand, {*/}
                {/*            [classes.expandOpen]: expanded,*/}
                {/*        })}*/}
                {/*        onClick={handleExpandClick}*/}
                {/*        aria-expanded={expanded}*/}
                {/*        aria-label="new post"*/}
                {/*    >*/}
                {/*        <CreateIcon/>*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
                {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        <PostCardForm/>*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}
                {renderMenu}
            </div>
        </Card>

    );
}
