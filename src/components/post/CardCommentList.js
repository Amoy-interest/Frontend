import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {Link} from 'react-router-dom'
import {FixedSizeList} from 'react-window';
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentItem, {CommentItemType} from "./CommentItem";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {getComments, postComment} from "../../service/PostService";
import {Divider} from "@material-ui/core";
import Message from "../commen/Message";
import amber from "@material-ui/core/colors/amber";
import Grid from "@material-ui/core/Grid";

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

Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ?
                (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

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
            blog_id: this.props.blog.blog_id,
            reply_user_id: this.props.blog.user_id,
            root_comment_id: 0,
            text: text.comment
        };
        const callback = (data) => {
            let comment=data.data;
            const newComments = [comment, ...this.state.comments];
            this.setState({comments: newComments});
            this.props.addComment();
        };
        postComment(param, callback);
    };


    render() {
        const {classes} = this.props;
        const {comments} = this.state;

        const handleDeleteItem = (index) => {
            let arr = this.state.comments;
            arr.splice(index, 1);
            this.setState({comments: arr});
            this.props.deleteComment();
        };

        function renderRow(itemProps) {
            const {index, style} = itemProps;
            return (
                <ListItem button style={style} key={index}>
                    <CommentItem comment={comments[index]} index={index} deleteComment={handleDeleteItem} type={CommentItemType.CARD}/>
                </ListItem>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };

        if (comments.length === 0) return <div>Loading</div>
        else {
            return (
                <div className={classes.root}>
                    <CommentForm commentId={comments} style={classes} submit={this.submitComment}/>
                    <Divider style={{marginTop: '20px'}}/>
                    <FixedSizeList className={classes.comment} style={{marginTop: '20px'}} height={300} width={600}
                                   itemSize={170}
                                   itemCount={comments.length}>
                        {renderRow}
                    </FixedSizeList>
                </div>
            );
        }

    }
}

export default connect(
    mapStateToProps, null
)(CardCommentList)
