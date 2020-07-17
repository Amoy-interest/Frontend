import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PostImage1 from '../../assets/post1.png';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CommentList from "./CommentList";
import Avatar2 from '../../assets/postavatar.jpeg';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    },
    count: {
        marginLeft: '8px'
    }
}));

export default function PostCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'report-menu';
    const {post} = props;

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        props.index === 0 ?
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem><ErrorOutlineIcon color={"secondary"}/>举报</MenuItem>
            </Menu> :
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem><EditIcon/>编辑</MenuItem>
                <MenuItem><DeleteIcon/>删除</MenuItem>
            </Menu>
    );

    const handleMoreInfoClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar} src={Avatar2}/>
                    }
                    action={
                        <IconButton onClick={handleMoreInfoClick} aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={post.blog_child.nickname}
                    subheader={post.blog_time}
                />
                <CardMedia
                    className={classes.media}
                    image={post.blog_child.images[0]}
                    title="沙滩"
                />
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {post.blog_child.text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon/>
                        <Typography className={classes.count} variant="body1" color="textSecondary" component="p">
                            {post.blog_count.vote_count}
                        </Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon/>
                        <Typography className={classes.count} variant="body1" color="textSecondary" component="p">
                            {post.blog_count.forward_count}
                        </Typography>
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <InsertCommentIcon/>
                        <Typography className={classes.count} variant="body1" color="textSecondary" component="p">
                            {post.blog_count.comment_count}
                        </Typography>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CommentList comments={post.blog_comments}/>
                    </CardContent>
                </Collapse>
            </Card>
            {renderMenu}
        </div>
    );
}
