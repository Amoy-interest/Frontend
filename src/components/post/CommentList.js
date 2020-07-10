import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { FixedSizeList } from 'react-window';
import PropTypes from "prop-types";
import Avatar1 from '../../assets/commentavatar.jpeg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginLeft:theme.spacing(2)
    },
    text:{
        minWidth:300,
    },
    submit:{
        width: 90,
        height:54,
        marginLeft:theme.spacing(1)
    },
    command:{
        marginTop:theme.spacing(1)
    },
    inline: {
        display: 'inline',
    },
}));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemAvatar>
                <Avatar alt="Binnie" src={Avatar1} />
            </ListItemAvatar>
            <ListItemText
                primary="毕业快乐"
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            display='inline'
                            color="textPrimary"
                        >
                            羡慕！
                        </Typography>
                        {"我也想要说走就走的旅行"}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function CommentList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-textarea"
                label="评论"
                placeholder="请输入评论"
                multiline
                variant="outlined"
                className={classes.text}
            />
            <Button className={classes.submit} variant="contained" color="primary">
                提交评论
            </Button>
            <FixedSizeList className={classes.comment} height={300} width={405} itemSize={100} itemCount={10}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
