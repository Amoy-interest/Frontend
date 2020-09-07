import React, {Component} from 'react';
import PostCard, {PostCardBelong, PostCardType} from "./PostCard";
import {
    getFollowPosts,
    getGroupPosts,
    getOwnPosts,
    getRandomPosts,
    getRecommendPosts,
    searchPosts
} from "../../service/PostService";
import {List, ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import {getTopicPosts} from "../../service/TopicService";
import {PostType, MsgType, MessageType} from "../../utils/constants";
import PubSub from "pubsub-js";
import AdminUserDialog from "../admin/dialogs/AdminUserDialog";
import {randomNum} from "../../utils/methods";

const styles = ((theme) => ({
    root: {
        width: '100%',
        //marginTop: theme.spacing(2),
        //overflow: 'auto'
    },
    item: {
        width: '100%'
    }
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

@withStyles(styles)
class PostCardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            hasMoreItems: true,
            nextHref: 0,
            pageSize: 2,
            key: randomNum(0, 500)
        };
        window.scrollTo(0, 0);
        this.loadMore = this.loadMore.bind(this);
        PubSub.subscribe(MsgType.ADD_POST, (msg, data) => {
            this.addPost(data);
        });
    }

    loadMore() {
        const callback = (data) => {
            if (data.status !== 200) {
                console.log(data);
                this.setState({hasMoreItems: false});
                PubSub.publish(MsgType.SET_MESSAGE, {text: data.msg, type: MessageType.ERROR});
                return;
            }
            this.setState({
                posts: [...this.state.posts, ...data.data.list],
                hasMoreItems: (data.data.totalPage > this.state.nextHref + 1),
                nextHref: this.state.nextHref + 1
            })
        };

        const params = {
            pageNum: this.state.nextHref,
            pageSize: this.state.pageSize
        };

        switch (this.props.index) {
            case PostType.RECOMMEND:
                getRecommendPosts(params, callback);
                break;
            case PostType.FOLLOW:
                getFollowPosts(params, callback);
                break;
            case PostType.OWN:
                const param = this.props.location.search.split('&');
                const user_id = param[0].substr(4);
                params.user_id = user_id;
                getOwnPosts(params, callback);
                break;
            case PostType.TOPIC:
                const topic_name = this.props.location.state.topic_name;
                params.topic_name = topic_name;
                getTopicPosts(params, callback);
                break;
            case PostType.SEARCH:
                params.keyword = this.props.location.state.keyword;
                searchPosts(params, callback);
                break;
            case PostType.GROUP:
                let group_name = this.props.location.state.group_name;
                if (group_name !== '热门') {
                    params.group_name = this.props.location.state.group_name;
                    getGroupPosts(params, callback);
                    break;
                }
            case PostType.RANDOM:
            default:
                getRandomPosts(params, callback);
                break;
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        window.scrollTo(0, 0);
        this.setState({
            posts: [],
            hasMoreItems: true,
            nextHref: 0,
            // key: this.state.key + 1
            key: randomNum(1, 500)
        });
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            // return;
        };
    };

    addPost = (post) => {
        if (this.props.index === PostType.OWN) {
            const param = this.props.location.search.split('&');
            const user_id = param[0].substr(4);
            if (this.props.user.user.user_id !== user_id) return;
        } else if (this.props.index === PostType.SEARCH || this.props.index === PostType.GROUP) return;

        this.setState({
            posts: [post, ...this.state.posts],
            key: randomNum(1, 500),
        });
    };

    deletePost = (index) => {
        let arr = this.state.posts;
        arr.splice(index, 1);
        this.setState({posts: arr, key: this.state.key + 1});
    };

    render() {
        return (
            <div className={this.props.classes.root}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    key={this.state.key}
                    // initialLoad={false}
                >
                    <List>
                        {this.state.posts.map((item, value) => {
                            const nickname = item.nickname;
                            //console.log(value, nickname);
                            return (
                                <ListItem className={this.props.classes.item} key={`postCard-${value}`}>
                                    {(this.props.user.user === null || this.props.user.user.nickname !== nickname) ?
                                        <PostCard key={item.blog_id} size={657} post={item} index={value}
                                                  type={PostCardType.LIST}
                                                  belong={PostCardBelong.OTHERS} addPost={this.addPost}
                                                  delete={this.deletePost}/> :
                                        <PostCard key={item.blog_id} post={item} size={657} index={value}
                                                  type={PostCardType.LIST}
                                                  belong={PostCardBelong.PERSONAL} addPost={this.addPost}
                                                  delete={this.deletePost}/>}
                                </ListItem>
                            );
                        })}
                    </List>
                </InfiniteScroll>
                <AdminUserDialog/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(PostCardList);
