import React, {Component} from 'react';
import PostCard, {PostCardBelong, PostCardType} from "./PostCard";
import {getComments, getPost, postComment} from "../../service/PostService";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import CommentList, {CommentListType} from "./CommentList";
import {getUserInfo} from "../../service/UserService";

const styles = ((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        overflow: 'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    content: {
        width:'100%'
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
        };

        //console.log("props", props);
        //this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        const arr = this.props.location.search.split('&');
        const blogId = arr[0].substr(4);
        const callback=(data)=>{
            this.setState({post: data.data});
        };
        getPost(blogId,callback);
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    };


    render() {
        const {classes} = this.props;
        const {post} = this.state;

        if(this.state.post === null) return null;

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    {(this.props.user.user === null || this.props.user.user.nickname !== post.nickname) ?
                        <PostCard post={post}  type={PostCardType.DETAIL} belong={PostCardBelong.OTHERS}/> : <PostCard post={post} size={870} type={PostCardType.DETAIL} belong={PostCardBelong.PERSONAL}/>}
                </div>
                <CommentList post={this.state.post} type={CommentListType.PRIMARY}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(PostDetail);
