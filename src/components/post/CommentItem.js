import Avatar from "@material-ui/core/Avatar";
import Avatar1 from "../../assets/avatar1.jpeg";
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
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import {withStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {grey} from "@material-ui/core/colors";
import CommentSecondary from "./CommendSecondary";
import CommentForm from "./CommentForm";
import Grid from "antd/lib/card/Grid";
import {back} from "nock";
import {Divider} from "@material-ui/core";

const styles = ((theme) => ({
    root: {
        width: '100%',
    },
    submit: {
        width: 90,
        height: 54,
        //marginLeft: theme.spacing(1)
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
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            voteCount: this.props.comment.vote_count,
            comment: this.props.comment,
            secondaryComment: null,
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
            "blog_id": -1,
            "nickname": "binnie",
            "reply_comment_nickname": this.props.user.user.nickname,
            "root_comment_id": this.state.comment_id,
            "text": text.comment
        };
        let comment = {
            "_deleted": false,
            "blog_id": -1,
            "comment_id": this.state.comment_id,
            "comment_level": 2,
            "comment_text": text.comment,
            "comment_time": Date(),
            "nickname": this.props.user.user.nickname,
            "reply_comment_nickname": this.state.comment.nickname,
            "root_comment_id": -1,
            "vote_count": 0
        };
        console.log(comment);
        const callback = () => {
            this.setState({expanded: false});
            this.setState({secondaryComment: comment});
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
        const {classes} = this.props;
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
                            <Avatar aria-label="comment" src={Avatar1}/>
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
                        {secondaryComment === null ? null :
                            <Typography variant="body2" color="textSecondary" component="p"
                                        style={{backgroundColor: grey[50], marginTop: '10px'}}>
                                {secondaryComment.nickname} 回复 {comment.nickname}: {secondaryComment.comment_text}
                            </Typography>
                        }
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent style={{backgroundColor: grey[50]}}>
                                <CommentForm commentId={comment} style={classes} submit={this.submitComment}/>
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

export const CommentItem = connect(
    mapStateToProps, null
)(Comment);

CommentItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentItem);
