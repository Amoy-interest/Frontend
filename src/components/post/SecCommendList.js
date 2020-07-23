import Avatar from "@material-ui/core/Avatar";
import Avatar1 from "../../assets/avatar1.jpeg";
import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {cancelVote, deleteComment, vote} from "../../service/PostService";
import {amber} from "@material-ui/core/colors";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import Grid from "antd/lib/card/Grid";
import CommentForm from "./CommentForm";
import {FixedSizeList} from "react-window";
import Snackbar from "@material-ui/core/Snackbar";

const styles = ((theme) => ({
    root: {
        width: '100%',
        //backgroundColor: theme.palette.background.paper,
    },
    submit: {
        width: 90,
        height: 54,
        //marginLeft: theme.spacing(1)
    },
    comment: {
        //marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
    inline: {
        display: 'inline',
    },
}));

class CommentSecondary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            voteCount: this.props.comment.vote_count,
            comment: this.props.comment,
        };
    };

    render() {
        const {comment, voted, voteCount} = this.state;
        const {classes}=this.props;
        const handleVote = (comment) => {
            let param = {blog_id: -1, comment_id: comment.comment_id};
            const count = this.state.voteCount;
            const callback2 = (data) => {
                console.log(data);
                this.setState({voted: false});
                this.setState({voteCount: count - 1});
            };
            const callback1 = (data) => {
                console.log(data);
                this.setState({voted: true});
                this.setState({voteCount: count + 1});
                console.log(this.state.voteCount);
            };
            this.state.voted ? cancelVote(param, callback2) : vote(param, callback1);
        };

        function renderRow(itemProps) {
            const {index, style} = itemProps;
            console.log(itemProps);
            return (
                <ListItem button style={style} key={index}>
                    <ListItemAvatar>
                        <Avatar alt="Binnie" src={Avatar1}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    display='inline'
                                    color="textPrimary"
                                >
                                    {comment.nickname}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    display='inline'
                                    color="textSecondary"
                                    style={{marginLeft: '5px'}}
                                >
                                    {comment.comment_time}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    display='inline'
                                    color="textPrimary"
                                >
                                    {comment.comment_text}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemIcon>
                        <IconButton edge="end" aria-label="micoff" style={{marginRight: "5px", position: 'fixed'}}
                                    onClick={() => {
                                        handleVote(comment)
                                    }}>
                            <ThumbUpAltIcon style={{color: voted ? amber[200] : null}}/>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {voteCount}
                            </Typography>
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };
        if (comment !== null)
            return (
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FixedSizeList className={classes.comment} height={300} width={550} itemSize={100}
                                           itemCount={10}>
                                {renderRow}
                            </FixedSizeList>
                        </Grid>
                    </Grid>
                    {/*<Snackbar open={messageOpen} autoHideDuration={6000} onClose={this.handleClose}>*/}
                    {/*    <Alert onClose={this.handleClose} severity="warning">*/}
                    {/*        请先登陆*/}
                    {/*    </Alert>*/}
                    {/*</Snackbar>*/}
                </div>
            );
        else
            return <div>Loading</div>
    }
}
CommentSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CommentSecondary);
