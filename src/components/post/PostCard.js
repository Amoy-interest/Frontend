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
import {amber, red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CommentList from "./CommentList";
import Avatar1 from '../../assets/avatar1.jpeg';
import Avatar2 from '../../assets/avatar2.jpeg';
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
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

class Post extends React.Component {

    constructor(props) {
        super(props);
        const {blog_count} = this.props.post;
        this.state = {
            voted: false,
            voteCount: blog_count.vote_count,
            commentCount: blog_count.comment_count,
            post: this.props.post,
            anchorEl: null,
            expanded: false,
            messageOpen: false,
        };
    };

    handleVote = (post) => {
        if (this.props.user.user === null) this.setState({messageOpen: true});
        else {
            let param = {blog_id: 0, comment_id: -1};
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
    addComment = () => {
        const count = this.state.commentCount;
        this.setState({commentCount: count + 1});
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
        const {post, voted, voteCount, commentCount, anchorEl, expanded,messageOpen} = this.state;
        const {classes} = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const menuId = 'report-menu';

        const renderMenu = (
            this.props.index === 0 ?
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
                    <Card style={{width: 657}}>
                        <CardHeader
                            avatar={
                                <Avatar src={this.props.index === 0 ? Avatar2 : Avatar1}/>
                            }
                            action={
                                <IconButton onClick={this.handleMoreInfoClick} aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={post.nickname}
                            subheader={post.blog_time}
                        />
                        <CardContent>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {post.blog_content.text}
                            </Typography>
                        </CardContent>
                        <PostImage image={post.blog_content.images}/>
                        <CardActions disableSpacing>
                            <IconButton aria-label="vote" onClick={() => {
                                this.handleVote(post)
                            }}>
                                <FavoriteIcon style={{color: voted ? amber[200] : null}}/>
                            </IconButton>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {voteCount}
                            </Typography>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {post.blog_count.forward_count}
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
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <CommentList comments={post.blog_comments} addComment={this.addComment}/>
                            </CardContent>
                        </Collapse>
                    </Card>
                    {renderMenu}
                    <Message messageOpen={messageOpen} handleClose={this.handleClose} type={'warning'} text={"请先登陆"}/>
                </div>
            );
        else return <div>Loading</div>;
    }
}

const PostCard = connect
(mapStateToProps, null)(Post);

PostCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);

// function Post(props) {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(false);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     //const [voted,setVoted]=React.useState(false);
//     //const [voteCount,setVoteCount]=React.useState(props.post.blog_count.vote_count);
//     const isMenuOpen = Boolean(anchorEl);
//     const menuId = 'report-menu';
//     const {post,voted,voteCount,handleVote} = props;
//
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };
//
//     const renderMenu = (
//         props.index === 0 ?
//             <Menu
//                 anchorEl={anchorEl}
//                 anchorOrigin={{vertical: 'top', horizontal: 'right'}}
//                 id={menuId}
//                 keepMounted
//                 transformOrigin={{vertical: 'top', horizontal: 'right'}}
//                 open={isMenuOpen}
//                 onClose={handleMenuClose}
//             >
//                 <MenuItem><ErrorOutlineIcon color={"secondary"}/>举报</MenuItem>
//             </Menu> :
//             <Menu
//                 anchorEl={anchorEl}
//                 anchorOrigin={{vertical: 'top', horizontal: 'right'}}
//                 id={menuId}
//                 keepMounted
//                 transformOrigin={{vertical: 'top', horizontal: 'right'}}
//                 open={isMenuOpen}
//                 onClose={handleMenuClose}
//             >
//                 <MenuItem><EditIcon/>编辑</MenuItem>
//                 <MenuItem><DeleteIcon/>删除</MenuItem>
//             </Menu>
//     );
//
//     const handleMoreInfoClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//
//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };
//     // const handleVote=(post)=>{
//     //     var param={blog_id:0,comment_id:-1};
//     //     const callback1=(data)=>{
//     //         console.log(data);
//     //         setVoted(true);
//     //         setVoteCount(voteCount+1);
//     //     };
//     //
//     //     const callback2=(data)=>{
//     //         console.log(data);
//     //         setVoted(false);
//     //         setVoteCount(voteCount-1);
//     //     };
//     //     voted? cancelVote(param,callback2): vote(param,callback1);
//     // };
//
//     return (
//         <div>
//             <Card
//                 className={classes.root}
//             >
//                 <CardHeader
//                     avatar={
//                         <Avatar className={classes.avatar} src={props.index===0?Avatar2:Avatar1}/>
//                     }
//                     action={
//                         <IconButton onClick={handleMoreInfoClick} aria-label="settings">
//                             <MoreVertIcon/>
//                         </IconButton>
//                     }
//                     title={post.nickname}
//                     subheader={post.blog_time}
//                 />
//                 <PostImage image={post.blog_content.images}/>
//                 <CardContent>
//                     <Typography variant="body1" color="textPrimary" component="p">
//                         {post.blog_content.text}
//                     </Typography>
//                 </CardContent>
//                 <CardActions disableSpacing>
//                     <IconButton aria-label="vote" onClick={()=>{handleVote(post)}}>
//                         <FavoriteIcon style={{color:voted?amber[200]:null}} />
//                     </IconButton>
//                     <Typography className={classes.count} variant="body1" color="textSecondary" component="p">
//                         {voteCount}
//                     </Typography>
//                     <IconButton aria-label="share">
//                         <ShareIcon/>
//                     </IconButton>
//                     <Typography className={classes.count} variant="body1" color="textSecondary" component="p">
//                         {post.blog_count.forward_count}
//                     </Typography>
//                     <IconButton
//                         className={clsx(classes.expand, {
//                             [classes.expandOpen]: expanded,
//                         })}
//                         onClick={handleExpandClick}
//                         aria-expanded={expanded}
//                         aria-label="show more"
//                     >
//                         <InsertCommentIcon/>
//                     </IconButton>
//                     <Typography className={classes.count} variant="body1" color="textSecondary" component="p">
//                         {post.blog_count.comment_count}
//                     </Typography>
//                 </CardActions>
//                 <Collapse in={expanded} timeout="auto" unmountOnExit>
//                     <CardContent>
//                         <CommentList comments={post.blog_comments}/>
//                     </CardContent>
//                 </Collapse>
//             </Card>
//             {renderMenu}
//         </div>
//     );
// };
