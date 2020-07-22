import React, {Component} from 'react';
import PostCard from "./PostCard";
import {getComments, getPost, postComment} from "../../service/PostService";
import {Divider, List, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import {PostType} from "../../utils/constants";
import CommentForm from "./CommentForm";
import {FixedSizeList} from "react-window";
import CommentItem from "./CommentItem";

const styles = ((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        overflow: 'auto'
    },
    content: {
        width:'100%'
    },
    item: {
        width:'100%'
    },
    commentContainer: {
        width: '100%',
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
        overflow: 'auto'
    },
    submit: {
        width: 90,
        height: 54,
    },
    comment: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
    inline: {
        display: 'inline',
    },
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

@withStyles(styles)
class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            comments: [],
            hasMoreItems: true,
            nextHref: 0,
            pageSize: 2
        };

        console.log("props", props)
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        console.log(this.props.id);
        const callback=(data)=>{
            console.log("data", data);
            this.setState({post: data.data});
        };
        getPost(this.props.id,callback);
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    };

    submitComment = (text) => {
        let param = {
            "blog_id": 0,
            "nickname": "binnie",
            "reply_comment_nickname": this.props.user.user.nickname,
            "root_comment_id": -1,
            "text": text.comment
        };
        let comment = [{
            "_deleted": false,
            "blog_id": -1,
            "comment_id": 1,
            "comment_level": 0,
            "comment_text": text.comment,
            "comment_time": Date(),
            "nickname": this.props.user.user.nickname,
            "reply_comment_nickname": "",
            "root_comment_id": -1,
            "vote_count": 0
        }];
        const callback = () => {
            const newComments = [...comment, ...this.state.comments];
            this.setState({comments: newComments});
            this.props.addComment();
        };
        postComment(param, callback);
    };


    loadMore() {
        const callback = (data) => {
            console.log("loadMore data", this.state);
            this.setState({
                comments: [...this.state.comments, ...data.data.list],
                hasMoreItems: (data.data.totalPage > this.state.nextHref),
                nextHref: this.state.nextHref + 1
            })
        };

        const params = {
            pageNum: this.state.nextHref,
            pageSize: this.state.pageSize,
            blog_id: this.state.post.blog_id
        };

        getComments(params, callback);

    }


    render() {
        const {classes} = this.props;
        const {post} = this.state;

        if(this.state.post === null) return null;

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    {(this.props.user.user === null || this.props.user.user.nickname !== post.nickname) ?
                        <PostCard post={post} index={0}/> : <PostCard post={post} index={1}/>}
                </div>
                <div className={classes.commentContainer}>
                    <CommentForm commentId={9} style={classes} submit={this.submitComment}/>
                    <Divider style={{marginTop: '20px'}}/>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        <List>
                            {this.state.comments.map((item, index) => {
                                return (
                                    <ListItem button style={{marginTop: '20px'}} key={index}>
                                        <CommentItem comment={item} index={index} deleteComment={() =>{}}/>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </InfiniteScroll>
                </div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(PostDetail);
