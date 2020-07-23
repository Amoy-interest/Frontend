import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {cancelVote, deleteComment, postComment, vote} from "../../service/PostService";
import {amber} from "@material-ui/core/colors";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import {withStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import {connect} from "react-redux";
import {grey} from "@material-ui/core/colors";
import CommentForm from "./CommentForm";
import {Divider} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InfiniteScroll from "react-infinite-scroller";

const styles = ((theme) => ({
    root: {
        width: '100%',
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
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
};

export const CommentItemType = {
    CARD: 0,
    PRIMARY: 1,
    SECONDARY: 2
};

@withStyles(styles)
class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            voteCount: this.props.comment.vote_count,
            comment: this.props.comment,
            secondaryComment: [],
            expanded: false,
            anchorEl: null
        };
    };

    handleVote = (comment) => {
        let param = {blog_id: -1, comment_id: comment.comment_id};
        const count = this.state.voteCount;
        const callback2 = (data) => {
            console.log(data);
            this.setState({voted: false});
            this.setState({voteCount: count - 1});
        };
        const callback1 = (data) => {
            console.log(data);
            this.setState({voted: true});
            this.setState({voteCount: count + 1});
            console.log(this.state.voteCount);
        };
        this.state.voted ? cancelVote(param, callback2) : vote(param, callback1);
    };

    submitComment = (text) => {
        let param = {
            blog_id: 0,
            reply_user_id: this.state.comment.user_id,
            root_comment_id: this.state.comment.comment_id,
            text: text.comment
        };
        const callback = (data) => {
            this.setState({expanded: false});
            let newSecondaryComment = [data.data, ...this.state.secondaryComment];
            this.setState({secondaryComment: newSecondaryComment});
        };
        postComment(param, callback);
    };

    handleDeleteComment = () => {
        let param = {comment_id: this.state.comment.comment_id};
        const callback = () => {
            this.props.deleteComment(this.props.index);
        };
        deleteComment(param, callback);
    };

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded})
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleMoreInfoClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    render() {
        const {classes, type} = this.props;
        const {expanded, voted, voteCount, comment, anchorEl, secondaryComment} = this.state;
        const menuId = 'report-menu';
        const isMenuOpen = Boolean(anchorEl);

        const renderMenu = (
            (this.props.user.user === null || this.props.user.user.nickname !== comment.nickname) ?
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    id={menuId}
                    keepMounted
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMenuOpen}
                    onClose={this.handleMenuClose}
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
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.handleDeleteComment}><DeleteIcon/>删除</MenuItem>
                </Menu>
        );
        return (
            <React.Fragment>
                <Card className={classes.root} elevation={0} variant="">
                    <CardHeader
                        avatar={
                            <Avatar aria-label="comment" src={comment.avatar_path}/>
                        }
                        action={
                            <React.Fragment>
                                <IconButton aria-label="vote" onClick={this.handleVote}>
                                    <ThumbUpAltIcon style={{color: voted ? amber[200] : null}}/>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {voteCount}
                                    </Typography>
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <InsertCommentIcon style={{color: expanded ? amber[200] : null}}/>
                                </IconButton>
                                <IconButton aria-label="settings" onClick={this.handleMoreInfoClick}>
                                    <MoreVertIcon/>
                                </IconButton>
                            </React.Fragment>
                        }
                        title={comment.nickname}
                        subheader={comment.comment_time}
                    />
                    <CardContent style={{height: ''}}>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {comment.comment_text}
                        </Typography>
                        {type === CommentItemType.CARD ?
                            secondaryComment.length === 0 ? null :
                                <List>
                                    {secondaryComment.map((item, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <Typography variant="body2" color="textSecondary" component="p"
                                                            style={{backgroundColor: grey[50], marginTop: '10px'}}>
                                                    {item.nickname} 回复 {comment.nickname}: {item.comment_text}
                                                </Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            : null
                        }
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent style={{backgroundColor: grey[50]}}>
                                <CommentForm secondary commentId={comment} submit={this.submitComment}/>
                            </CardContent>
                        </Collapse>
                        <Divider style={{marginTop: '20px'}}/>
                    </CardContent>
                    {renderMenu}
                </Card>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps, null
)(CommentItem);
