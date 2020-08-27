import React, {Component} from 'react';
import PostCard, {PostCardBelong, PostCardType} from "./PostCard";
import { getPost } from "../../service/PostService";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import CommentList, {CommentListType} from "./CommentList";
import AdminUserDialog from "../admin/dialogs/AdminUserDialog";

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
    }

    getPost(props){
        const arr = props.location.search.split('&');
        const blogId = arr[0].substr(4);
        console.log(blogId);
        const callback=(data)=>{
            this.setState({post: data.data});
            // this.props.history.go(0);
            // window.location.reload();
            console.log(this.state.post);
            console.log(data);
        };
        getPost(blogId,callback);
    }

    componentDidMount() {
        this.getPost(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext){
        this.getPost(nextProps);
        console.log("new Page");
    };

    render() {
        const {classes} = this.props;
        const {post} = this.state;

        if(this.state.post === null) return null;

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    {(this.props.user.user === null || this.props.user.user.nickname !== post.nickname) ?
                        <PostCard post={this.state.post}  type={PostCardType.DETAIL} belong={PostCardBelong.OTHERS} size={870}/> :
                        <PostCard post={this.state.post} size={870} type={PostCardType.DETAIL} belong={PostCardBelong.PERSONAL}/>}
                </div>
                <CommentList post={this.state.post} type={CommentListType.PRIMARY}/>
                <AdminUserDialog/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(PostDetail);
