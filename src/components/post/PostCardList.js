import React, {Component} from 'react';
import PostCard from "./PostCard";
import {getFollowPosts, getOwnPosts, getRandomPosts, getRecommendPosts} from "../../service/PostService";
import {List,ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import * as postService from "../../service/PostService";
import InfiniteScroll from "react-infinite-scroller";
import Typography from "@material-ui/core/Typography";
import {PostType} from "../../utils/constants";

const styles = ((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        overflow: 'auto'
    },
    item: {
        width:'100%'
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
            pageSize: 2
        };

        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        const callback = (data) => {
            console.log("loadMore data", data);
            console.log("state", this.state);
            this.setState({
                posts: [...this.state.posts, ...data.data.list],
                hasMoreItems: (data.data.totalPage > this.state.nextHref),
                nextHref: this.state.nextHref + 1
            })
        };

        const params = {
            pageNum: this.state.nextHref,
            pageSize: this.state.pageSize
        };

        // postService.getRandomPosts(params, callback);

        switch (this.props.index) {
            case PostType.RANDOM:
            default:
                getRandomPosts(params, callback);
                break;
            case PostType.RECOMMEND:
                getRecommendPosts(params, callback);
                break;
            case PostType.FOLLOW:
                getFollowPosts(params, callback);
                break;
            case PostType.OWN:
                params.user_id = 0;
                getOwnPosts(params, callback);
                break;
        }
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    };

    render() {

        return (
            <div className={this.props.classes.root}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    // useWindow={false}
                >
                    <List>
                        {this.state.posts.map((item, value) => {
                            const nickname = item.nickname;
                            console.log(value, nickname);
                            return (
                                <ListItem className={this.props.classes.item} key={`postCard-${value}`}>
                                    {(this.props.user.user === null || this.props.user.user.nickname !== nickname) ?
                                        <PostCard post={item} index={0}/> : <PostCard post={item} index={1}/>}
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
)(PostCardList);
