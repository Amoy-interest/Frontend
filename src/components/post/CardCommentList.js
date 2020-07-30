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
import {Divider} from "@material-ui/core";

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
            console.log(this.state.comments);
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


    render() {
        const {classes,post} = this.props;
        const {comments} = this.state;

        const handleDeleteItem = (index) => {
            let arr = this.state.comments;
            arr.splice(index, 1);
            this.setState({comments: arr});
            this.props.deleteComment();
        };
        const addComment=()=>{
            console.log('add comment');
            this.props.addComment();
        };
        function renderRow(itemProps) {
            const {index, style} = itemProps;
            return (
                <ListItem button style={style} key={index}>
                    <CommentItem comment={comments[index]} index={index} deleteComment={handleDeleteItem}
                                 type={CommentItemType.CARD} post={post} submit={addComment}/>
                </ListItem>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };

        return (
            <div className={classes.root}>
                <CommentForm commentId={comments} style={classes} submit={this.submitComment}/>
                <Divider style={{marginTop: '20px'}}/>
                {comments.length === 0 ? <div>Loading</div> :
                    <FixedSizeList className={classes.comment} style={{marginTop: '20px'}} height={300} width={600}
                                   itemSize={170}
                                   itemCount={comments.length}>
                        {renderRow}
                    </FixedSizeList>}
            </div>
        );
    }

}

export default connect(
    mapStateToProps, null
)(CardCommentList)
