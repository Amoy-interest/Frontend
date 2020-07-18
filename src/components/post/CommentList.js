import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {FixedSizeList} from 'react-window';
import PropTypes from "prop-types";
import Avatar1 from '../../assets/commentavatar.jpeg';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    text: {
        minWidth: 300,
    },
    submit: {
        width: 90,
        height: 54,
        marginLeft: theme.spacing(1)
    },
    comment: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2)
    },
    inline: {
        display: 'inline',
    },
}));


export default function CommentList(props) {
    const classes = useStyles();
    const comments = props.comments;

    function renderRow(itemProps) {
        const {index, style} = itemProps;

        console.log(itemProps)


        return (
            <ListItem button style={style} key={index}>
                <ListItemAvatar>
                    <Avatar alt="Binnie" src={Avatar1}/>
                </ListItemAvatar>
                <ListItemText
                    primary={comments[index].nickname}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                display='inline'
                                color="textPrimary"
                            >
                                {comments[index].comment_text}
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                display='inline'
                                color="textSecondary"
                            >
                                {comments[index].comment_time}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <ListItemIcon>
                    <IconButton edge="end" aria-label="micoff" style={{marginRight: "5px"}}>
                        <ThumbUpAltIcon/>
                        <Typography
                            component="span"
                            variant="body2"
                            display='inline'
                            color="textPrimary"
                        >
                            {comments[index].vote_count}
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

    return (
        <div className={classes.root}>
            <CommentForm commentId={comments} style={classes}/>
            <FixedSizeList className={classes.comment} height={300} width={405} itemSize={100}
                           itemCount={comments.length}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
