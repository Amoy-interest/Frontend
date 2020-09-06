import React, {Component} from 'react';
import {getComments, getMultiLevelComments, postComment} from "../../service/PostService";
import {Divider, List, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import CommentForm from "./CommentForm";
import CommentItem, {CommentItemType} from "./CommentItem";
import PubSub from "pubsub-js";
import {MessageType, MsgType} from "../../utils/constants";
import {randomNum} from "../../utils/methods";

const styles = ((theme) => ({
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
class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            hasMoreItems: true,
            nextHref: 0,
            pageSize: 5,
            key: randomNum(1, 500)
        };

        //console.log("props", props);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        //console.log(this.props);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };

    submitComment = (text) => {
        const callback = (data) => {
            console.log(data);
            if (data.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {type: MessageType.ERROR, text: data.msg});
            else {
                this.setState({
                    comments: [data.data, ...this.state.comments],
                    key: this.state.key + 1
                    // key: Math.random().toString(36).substr(2)
                });
                PubSub.publish(MsgType.ADD_COMMENT);
            }
        };

        if (this.props.type === CommentListType.PRIMARY) {
            let param = {
                blog_id: this.props.post.blog_id,
                reply_user_id: this.props.post.user_id,
                root_comment_id: 0,
                text: text.comment
            };
            console.log(param)
            postComment(param, callback);
        } else {
            let param = {
                blog_id: this.props.post.blog_id,
                reply_user_id: this.props.comment.user_id,
                root_comment_id: this.props.comment.comment_id,
                text: text.comment
            };
            console.log(param);
            postComment(param, callback);
        }
    };

    addComment = (comment) => {
        this.setState({
            comments: [comment, ...this.state.comments],
            key: this.state.key + 1
        });
        PubSub.publish(MsgType.ADD_COMMENT);
        //console.log(this.state.comments);
    };

    handleDeleteItem = (index) => {
        let arr = this.state.comments;
        arr.splice(index, 1);
        this.setState({comments: arr, key: this.state.key + 1});
        PubSub.publish(MsgType.DELETE_COMMENT);
    };

    loadMore() {
        const callback = (data) => {
            //onsole.log("loadMore data", this.state);
            this.setState({
                comments: [...this.state.comments, ...data.data.list],
                hasMoreItems: (data.data.totalPage > this.state.nextHref),
                nextHref: this.state.nextHref + 1
            })
        };
        if (this.props.type === CommentListType.PRIMARY) {
            const params = {
                pageNum: this.state.nextHref,
                pageSize: this.state.pageSize,
                blog_id: this.props.post.blog_id
            };
            getComments(params, callback);
        } else {
            const params = {
                pageNum: this.state.nextHref,
                pageSize: this.state.pageSize,
                root_comment_id: this.props.comment.comment_id
                //this.props.comment.comment_id
            };
            getMultiLevelComments(params, callback);
        }

    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext){
        console.log("new post",nextProps);
        this.setState({
                comments: [],
                hasMoreItems: true,
                nextHref: 0,
                pageSize: 5,
                key: randomNum(1, 500)
            }
        );
    };

    render() {
        const {classes} = this.props;
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
                    key={this.state.key}>
                    <List>
                        {this.state.comments.map((item, index) => {
                            return (
                                <ListItem key={index}>
                                    <CommentItem comment={item}
                                                 type={this.props.type === CommentListType.PRIMARY ? CommentItemType.PRIMARY : CommentItemType.SECONDARY}
                                                 submit={this.addComment}
                                                 index={index} deleteComment={this.handleDeleteItem}
                                                 post={this.props.post}
                                                 root_comment_id={this.props.type === CommentListType.PRIMARY ?item.comment_id:this.props.root_comment_id}
                                    />
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
)(CommentList);
