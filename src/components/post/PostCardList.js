import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PostCard from "./PostCard";
import {getFollowPosts, getOwnPosts, getRandomPosts, getRecommendPosts} from "../../service/PostService";
import {List,ListItem} from "@material-ui/core";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2)
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

export function PostCards(props) {
    const classes = useStyles();
    console.log(props.user);
    return (
        <div className={classes.root}>
            <List>
                {props.posts.map((item, value) => {
                    const nickname = item.nickname;
                    console.log(nickname);
                    return (
                        <ListItem className={classes.item} key={value}>
                            {(props.user.user === null || props.user.user.nickname !== nickname) ?
                                <PostCard post={item} index={0}/> : <PostCard post={item} index={1}/>}
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export const Posts = connect(
    mapStateToProps, null
)(PostCards);

export default class PostCardList extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: null};
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({posts: data.data});
            console.log(this.state.posts);
        };
        switch (this.props.index) {
            case 0:
            default:
                getRandomPosts(callback);
                break;
            case 1:
                getRecommendPosts(callback);
                break;
            case 2:
                getFollowPosts(callback);
                break;
            case 3:
                getOwnPosts(callback);
                break;
        }
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    };

    render() {
        if (!this.state.posts) return (<div>Loading</div>);
        else return (
            <Posts posts={this.state.posts}/>
        );
    }
}
