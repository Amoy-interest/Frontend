import React, {Component} from 'react';
import PostCard, {PostCardBelong, PostCardType} from "./PostCard";
import {getComments, getPost, postComment} from "../../service/PostService";
import {Divider, List, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const styles = ((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        width: '100%'
    },
    item: {
        width: '100%'
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
        marginTop: theme.spacing(3),
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

export const CommentListType = {
    PRIMARY: 0,
    SECONDARY: 1
};

@withStyles(styles)
class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            hasMoreItems: true,
            nextHref: 0,
            pageSize: 2
        };

        console.log("props", props);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };

    submitComment = (text) => {
        let param = {
            blog_id: 0,
            reply_user_id: this.state.comment.user_id,
            root_comment_id: this.state.comment.comment_id,
            text: text.comment
        };
        const callback = (data) => {
            const newComments = [data.data, ...this.state.comments];
            this.setState({comments: newComments});
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
        if (this.state.comments.length === 0) return null;
        return (
            <div className={classes.commentContainer}>
                <div style={{marginTop: '10px'}}>
                    <CommentForm commentId={9} style={classes} submit={this.submitComment}/>
                </div>
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
                                <ListItem key={index}>
                                    <CommentItem comment={item} index={index} deleteComment={() => {
                                    }}/>
                                </ListItem>
                            );
                        })}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(PostDetail);
