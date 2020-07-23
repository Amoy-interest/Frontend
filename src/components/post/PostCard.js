import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {amber} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CommentList from "./CardCommentList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PostImage from "./PostImage";
import {cancelVote, vote} from "../../service/PostService";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import Message from "../commen/Message";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import ForwardCard from "./ForwardCard";
import Modal from "@material-ui/core/Modal";
import PostForm from "./PostForm";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/colors/grey";
import {PostType} from "../../utils/constants";

const styles = (theme => ({
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
    paper: {
        position: 'absolute',
    },
    forwardModal: {
        padding: theme.spacing(1)
    }
}));

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
};

export const PostCardBelong={
    OTHERS:0,
    PERSONAL:1
};
export const PostCardType={
    LIST:0,
    DETAIL:1,
};

@withStyles(styles)
class PostCard extends React.Component {

    constructor(props) {
        super(props);
        const {blog_count} = this.props.post;
        this.state = {
            voted: false,
            forward: false,
            voteCount: blog_count.vote_count,
            commentCount: blog_count.comment_count,
            forwardCount: blog_count.forward_count,
            post: this.props.post,
            anchorEl: null,
            expanded: false,
            messageOpen: false,
            forwardModalOpen: false,
        };
    };

    handleVote = (post) => {
        if (this.props.user.user === null) this.setState({messageOpen: true});
        else {
            let param = {blog_id: post.blog_id, comment_id: -1};
            let count = this.state.voteCount;
            const callback1 = (data) => {
                console.log(data);
                this.setState({voted: true});
                this.setState({voteCount: count + 1});
                console.log(this.state.voteCount);
            };
            const callback2 = (data) => {
                console.log(data);
                this.setState({voted: false});
                this.setState({voteCount: count - 1});
            };
            this.state.voted ? cancelVote(param, callback2) : vote(param, callback1);
        }
    };

    handleForward = (post) => {
        if (this.props.user.user === null) this.setState({messageOpen: true});
        else if (!this.state.forward) {
            this.handleModalOpen();
            this.setState({forward: true});
        }
    };
    submitForward = (values) => {
        // let blog_type = this.state.post.blog_type;
        // console.log(values);
        // let rootPost = blog_type === 0 ? this.state.post : this.state.post.blog_child;
        // let date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
        // console.log(this.props.user.user);
        // let newPost = {
        //     avatar_path: this.props.user.user.avatar,
        //     blog_child: {
        //         avatar_path: rootPost.avatar_path,
        //         blog_content:rootPost.blog_content,
        //         blog_id: rootPost.blog_id,
        //         blog_time: rootPost.blog_time,
        //         nickname: rootPost.nickname,
        //         user_id: 0
        //     },
        //     blog_content: {
        //         images: [],
        //         text: values.content
        //     },
        //     blog_count: {
        //         comment_count: 0,
        //         forward_count: 0,
        //         report_count: 0,
        //         vote_count: 0
        //     },
        //     blog_id: 0,
        //     blog_time:date,
        //     blog_type: 1,
        //     nickname: this.props.user.user.nickname
        // };
        this.handleModalClose();
        this.props.addPost(values);
    };

    handleModalOpen = () => {
        this.setState({forwardModalOpen: true});
    };

    handleModalClose = () => {
        this.setState({forwardModalOpen: false, forward: false});
    };

    addComment = () => {
        const count = this.state.commentCount;
        this.setState({commentCount: count + 1});
    };

    deleteComment = () => {
        const count = this.state.commentCount;
        this.setState({commentCount: count - 1});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleMoreInfoClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleExpandClick = () => {
        if (this.props.user.user === null) this.setState({messageOpen: true});
        else this.setState({expanded: !this.state.expanded});
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({messageOpen: false});
    };

    render() {
        const {post, voted, forward, voteCount, commentCount, forwardCount, anchorEl, expanded, messageOpen, forwardModalOpen} = this.state;
        const {classes} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const menuId = 'report-menu';

        const renderMenu = (
            this.props.belong === PostCardBelong.OTHERS ?
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
                    <MenuItem><EditIcon/>编辑</MenuItem>
                    <MenuItem><DeleteIcon/>删除</MenuItem>
                </Menu>
        );

        if (this.state.post !== null)
            return (
                <div>
                    <Card style={{width: this.props.size === null ? '100%' : this.props.size}}
                          elevation={this.props.type === PostCardType.DETAIL ? 0 : 1}>
                        <CardHeader
                            avatar={
                                <Avatar src={post.avatar_path}/>
                            }
                            action={
                                <IconButton onClick={this.handleMoreInfoClick} aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={post.nickname}
                            subheader={post.blog_time}
                        />
                        <Link style={{color: '#fff'}} to={{
                            pathname: '/post-detail',
                            search: '?id=' + post.blog_id
                        }}>
                            <CardContent>
                                <Typography variant="body1" color="textPrimary" component="p">
                                    {post.blog_content.text}
                                </Typography>
                            </CardContent>
                        </Link>
                        {post.blog_type === 0 ? <PostImage image={post.blog_content.images}/> :
                            <ForwardCard post={post.blog_child} size={'100%'}/>}
                        <CardActions disableSpacing>
                            <IconButton aria-label="vote" onClick={() => {
                                this.handleVote(post)
                            }}>
                                <FavoriteIcon style={{color: voted ? amber[200] : null}}/>
                            </IconButton>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {voteCount}
                            </Typography>
                            <IconButton aria-label="share" onClick={() => {
                                this.handleForward(post)
                            }}>
                                <ShareIcon style={{color: forward ? amber[200] : null}}/>
                            </IconButton>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {forwardCount}
                            </Typography>
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
                            <Typography variant="body1" color="textSecondary" component="p">
                                {commentCount}
                            </Typography>
                        </CardActions>
                        {this.props.type === PostCardType.DETAIL ? null :
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <CommentList blog={post} addComment={this.addComment}
                                                 deleteComment={this.deleteComment}/>
                                    <Grid container className={classes.link}>
                                        <Grid item xs={5}/>
                                        <Grid item xs>
                                            <Link style={{color: amber[200], fontSize: '18px'}} to={{
                                                pathname: '/post-detail',
                                                search: '?id=' + post.blog_id,
                                            }}
                                            >Load More
                                            </Link>
                                        </Grid>
                                        <Grid item xs/>
                                    </Grid>
                                </CardContent>
                            </Collapse>
                        }
                    </Card>
                    {renderMenu}
                    <Modal open={forwardModalOpen} onClose={this.handleModalClose}>
                        <div style={getModalStyle()} className={classes.paper}>
                            <Paper className={classes.forwardModal}>
                                <PostForm type={PostType.FORWARD}
                                          postId={post.blog_type === 0 ? post.blog_id : post.blog_child.blog_id}
                                          closeModal={this.handleModalClose}
                                          submit={this.submitForward}
                                />
                                <ForwardCard
                                    post={post.blog_type === 0 ? post : post.blog_child}
                                    size={500}
                                />
                            </Paper>
                        </div>
                    </Modal>
                    <Message messageOpen={messageOpen} handleClose={this.handleClose} type={'warning'} text={"请先登陆"}/>
                </div>
            );
        else return <div>Loading</div>;
    }
}

export default connect
(mapStateToProps, null)(PostCard);
