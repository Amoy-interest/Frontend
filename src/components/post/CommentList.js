import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {Link} from 'react-router-dom'
import {FixedSizeList} from 'react-window';
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {postComment} from "../../service/PostService";
import {Divider} from "@material-ui/core";
import Message from "../commen/Message";
import amber from "@material-ui/core/colors/amber";
import Grid from "@material-ui/core/Grid";

const styles = ((theme) => ({
    root: {
        width: '100%',
        display:'flex',
        alignItem:'center',
        flexDirection:'column'
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

class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
            messageOpen: false,
        };
    };

    submit = (text) => {
        console.log(text);
        if (this.props.user.user === null) this.setState({messageOpen: true});
        else {
            let param = {
                "blog_id": 0,
                "nickname": "binnie",
                "reply_comment_nickname": this.props.user.user.nickname,
                "root_comment_id": -1,
                "text": text.comment
            };
            let comment = [{
                "_deleted": false,
                "blog_id": -1,
                "comment_id": 1,
                "comment_level": 0,
                "comment_text": text.comment,
                "comment_time": Date(),
                "nickname": this.props.user.user.nickname,
                "reply_comment_nickname": "",
                "root_comment_id": -1,
                "vote_count": 0
            }];
            const callback = () => {
                const newComments = [...comment, ...this.state.comments];
                this.setState({comments: newComments});
                this.props.addComment();
            };
            postComment(param, callback);
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({messageOpen: false});
    };

    render() {
        const {classes,blog} = this.props;
        const {comments, messageOpen} = this.state;

        const handleDeleteItem = (index) => {
            let arr = this.state.comments;
            arr.splice(index, 1);
            this.setState({comments: arr});
        };

        function renderRow(itemProps) {
            const {index, style} = itemProps;
            //console.log(itemProps);
            return (
                <ListItem button style={style} key={index}>
                    <CommentItem comment={comments[index]} index={index} deleteComment={handleDeleteItem}/>
                </ListItem>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };

        if (comments !== null)
            return (
                <div className={classes.root}>
                    <CommentForm commentId={comments} style={classes} submit={this.submit}/>
                    <Divider style={{marginTop:'20px'}}/>
                    <FixedSizeList className={classes.comment} style={{marginTop: '20px'}}height={300} width={600} itemSize={170}
                                   itemCount={comments.length}>
                        {renderRow}
                    </FixedSizeList>
                    <Grid container className={classes.link}>
                        <Grid item xs={5}></Grid>
                        <Grid item xs>
                            <Link style={{color:amber[200],fontSize:'18px'}} to={{
                            pathname: '/post-detail',
                            search: '?id=' + 1}}
                                  target="_blank"
                            >Load More
                            </Link>
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>
                    <Message messageOpen={messageOpen} handleClose={this.handleClose} type={'warning'} text={"请先登陆"}/>
                </div>
            );
        else
            return <div>Loading</div>
    }
}


const CommentList = connect(
    mapStateToProps, null
)(Comments);

CommentList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CommentList);
