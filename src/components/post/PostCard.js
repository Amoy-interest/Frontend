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
import {cancelVote, reportPost, vote, deletePost, editPost} from "../../service/PostService";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import Message from "../commen/Message";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import ForwardCard from "./ForwardCard";
import Modal from "@material-ui/core/Modal";
import PostForm from "./PostForm";
import Paper from "@material-ui/core/Paper";
import {MsgType, PostType, UserType} from "../../utils/constants";
import MicOffIcon from '@material-ui/icons/MicOff';
import BlockIcon from "@material-ui/icons/Block";
import PostEditForm from "./PostEditForm";
import PubSub from "pubsub-js";
import grey from "@material-ui/core/colors/grey";
import {ListItem} from "@material-ui/core";
import CommentItem, {CommentItemType} from "./CommentItem";
import {CommentListType} from "./CommentList";

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
    },
    editModal: {
        padding: theme.spacing(1),
        width: 500
    },
    delete:{
        backgroundColor:grey[50],
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        width:'100%',
        height:50
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
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
        user: state.userReducer,
        role: state.userReducer.role
    }
};

// eslint-disable-next-line no-extend-native
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export const PostCardBelong = {
    OTHERS: 0,
    PERSONAL: 1
};

export const PostCardType = {
    LIST: 0,
    DETAIL: 1,
};

@withStyles(styles)
class PostCard extends React.Component {

    constructor(props) {
        super(props);
        const {blog_count} = this.props.post;
        this.state = {
            voted: this.props.post._vote,
            forward: false,
            voteCount: blog_count.vote_count,
            commentCount: blog_count.comment_count,
            forwardCount: blog_count.forward_count,
            text: this.props.post.blog_content.text,
            post: this.props.post,
            anchorEl: null,
            expanded: false,
            messageOpen: false,
            forwardModalOpen: false,
            editModalOpen: false,
            reportMessageOpen: false
        };

        PubSub.subscribe(MsgType.ADD_COMMENT, (msg) => {
            this.setState({commentCount:this.state.commentCount+1});
        });
        PubSub.subscribe(MsgType.DELETE_COMMENT, (msg) => {
            this.setState({commentCount:this.state.commentCount-1});
        });
    };

    handleVote = (post) => {
        if (this.props.user.user === null) this.setState({messageOpen: true});
        else {
            let param = {blog_id: post.blog_id, comment_id: 0};
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
        this.handleModalClose();
        this.props.addPost(values);
    };

    handleModalOpen = () => {
        this.setState({forwardModalOpen: true});
    };

    handleModalClose = () => {
        this.setState({forwardModalOpen: false, forward: false});
    };

    handleEditModalOpen = () => {
        this.setState({editModalOpen: true});
    };

    handleEditModalClose = () => {
        this.setState({editModalOpen: false});
    };

    submitEdit = (text) => {
        const callback = () => {
            this.setState({text: text.text});
            this.handleEditModalClose();
        };
        let data = {
            blog_id: this.state.post.blog_id,
            images: this.state.post.blog_content.images,
            text: text.text
        };
        editPost(data, callback);
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

    handleReportMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({reportMessageOpen: false});
    };

    handleReportPost = () => {
        const callback = () => {
            //console.log('report success');
            this.handleMenuClose();
            this.setState({reportMessageOpen: true})
        };
        reportPost(this.state.post.blog_id, callback);
    };

    handleDeletePost = () => {
        const callback = () => {
            //console.log('delete success');
            this.handleMenuClose();
            this.props.delete(this.props.index);
        };
        deletePost(this.state.post.blog_id, callback);
    };

    render() {
        const {post, voted, forward, text, voteCount, commentCount, forwardCount, anchorEl, expanded, messageOpen, reportMessageOpen, forwardModalOpen, editModalOpen} = this.state;
        const {classes} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const menuId = 'report-menu';

        const renderMenu = (
            this.props.role === UserType.CUSTOMER ?
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
                        <MenuItem onClick={this.handleReportPost}><ErrorOutlineIcon color={"secondary"}/>举报</MenuItem>
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
                        <MenuItem onClick={this.handleEditModalOpen}><EditIcon/>编辑</MenuItem>
                        <MenuItem onClick={this.handleDeletePost}><DeleteIcon/>删除</MenuItem>
                    </Menu> : this.props.role === UserType.ADMIN ?
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    id={menuId}
                    keepMounted
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={isMenuOpen}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={() => {this.handleMenuClose();PubSub.publish(MsgType.ADMIN.BAN_USR, post.user_id)}}><MicOffIcon
                        color={"secondary"}/>禁言</MenuItem>
                    <MenuItem onClick={() => {this.handleMenuClose();PubSub.publish(MsgType.ADMIN.FORBID_USR, post.user_id)}}><BlockIcon
                        color={"secondary"}/>封号</MenuItem>
                </Menu> : null

        );

        if (this.state.post !== null)
            return (
                <div>
                    <Card style={{width: this.props.size === null ? '100%' : this.props.size}}
                          elevation={this.props.type === PostCardType.DETAIL ? 0 : 1}>
                        <CardHeader
                            avatar={
                                <Link style={{color: amber[200], fontSize: '18px'}} to={{
                                    pathname: '/personal-info',
                                    search: '?id=' + post.user_id,
                                }}>
                                    <Avatar className={classes.avatar} src={post.avatar_path}/>
                                </Link>
                            }
                            action={
                                <IconButton onClick={this.handleMoreInfoClick} aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={post.nickname}
                            subheader={new Date(post.blog_time).Format("yyyy-MM-dd hh:mm:ss")}
                        />
                            <CardContent>
                                {post.topics_name.length===0?null:
                                    post.topics_name.map((item, index) => {
                                        return (
                                            <Link style={{color: '#fff'}} to={{
                                                pathname: '/topic-discussion',
                                                state:{topic_name:post.topic_name}}}>
                                                <Typography variant="body1" color="primary" component="p">
                                                    {`#${item}#`}
                                                </Typography>
                                            </Link>
                                        );})}
                                <Link style={{color: '#fff'}} to={{
                                    pathname: '/post-detail',
                                    search: '?id=' + post.blog_id
                                }}>
                                    <Typography variant="body1" color="textPrimary"
                                                //component="p"
                                    >
                                        {text}
                                    </Typography>
                                </Link>
                            </CardContent>
                        {post.blog_type === 0 ? <PostImage image={post.blog_content.images}/> :
                            post.blog_child === null ? <div className={classes.delete}>博文已经被删除</div> :
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
                                    <CommentList post={post} addComment={this.addComment}
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
                                          postId={post.blog_type === 0||post.blog_child === null ? post.blog_id : post.blog_child.blog_id}
                                          closeModal={this.handleModalClose}
                                          submit={this.submitForward}
                                />
                                <ForwardCard
                                    post={post.blog_type === 0||post.blog_child === null ? post : post.blog_child}
                                    size={500}
                                />
                            </Paper>
                        </div>
                    </Modal>
                    <Modal open={editModalOpen} onClose={this.handleEditModalClose}>
                        <div style={getModalStyle()} className={classes.paper}>
                            <Paper className={classes.editModal}>
                                <PostEditForm type={PostType.FORWARD}
                                              postId={post.blog_id}
                                              closeModal={this.handleEditModalClose}
                                              submit={this.submitEdit}
                                              post_content={post.blog_content.text}
                                />
                                {post.blog_type === 0 ? <PostImage image={post.blog_content.images}/> :
                                    post.blog_child === null ? <div className={classes.delete}>博文已经被删除</div>:<PostImage image={post.blog_child.blog_content.images}/>}
                            </Paper>
                        </div>
                    </Modal>
                    <Message messageOpen={messageOpen} handleClose={this.handleClose} type={'warning'} text={"请先登陆"}/>
                    <Message messageOpen={reportMessageOpen} handleClose={this.handleReportMessageClose}
                             type={'success'} text={"举报成功"}/>
                </div>
            );
        else return <div>Loading</div>;
    }
}

export default connect
(mapStateToProps, null)(PostCard);
