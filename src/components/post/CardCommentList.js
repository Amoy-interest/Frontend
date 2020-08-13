import React from 'react';
import ListItem from '@material-ui/core/ListItem';
// import {Link} from 'react-router-dom'
import {FixedSizeList} from 'react-window';
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentItem, {CommentItemType} from "./CommentItem";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {getComments, postComment} from "../../service/PostService";
import {Divider, List} from "@material-ui/core";
import {CommentListType} from "./CommentList";

const styles = ((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column'
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
    link: {
        marginTop: theme.spacing(2)
    }
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

@withStyles(styles)
class CardCommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    };

    componentDidMount() {
        const callback = (data) => {
            this.setState({comments: data.data.list});
        };
        let param = {blog_id: this.props.post.blog_id};
        getComments(param, callback)
    };

    submitComment = (text) => {
        let param = {
            blog_id: this.props.post.blog_id,
            reply_user_id: this.props.post.user_id,
            root_comment_id: 0,
            text: text.comment
        };
        const callback = (data) => {
            let comment = data.data;
            const newComments = [comment, ...this.state.comments];
            this.setState({comments: newComments});
            this.props.addComment();
        };
        postComment(param, callback);
    };
    handleDeleteItem = (index) => {
        let arr = this.state.comments;
        arr.splice(index, 1);
        this.setState({comments: arr});
        this.props.deleteComment();
    };
    addComment=()=>{
        this.props.addComment();
    };

    render() {
        const {classes,post} = this.props;
        const {comments} = this.state;

        return (
            <div className={classes.root}>
                <CommentForm commentId={comments} style={classes} submit={this.submitComment}/>
                <Divider style={{marginTop: '20px'}}/>
                    <List>
                        {this.state.comments.map((item, index) => {
                            return (
                                <ListItem key={index}>
                                    <CommentItem comment={item} index={index} deleteComment={this.handleDeleteItem}
                                                 type={CommentItemType.CARD} post={post} submit={this.addComment}/>
                                </ListItem>
                            );
                        })}
                    </List>
            </div>
        );
    }

}

export default connect(
    mapStateToProps, null
)(CardCommentList)
