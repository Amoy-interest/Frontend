import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import PostCardList from "../../components/post/PostCardList";
import TopicCard from "../../components/topic/TopicCard";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(1)
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function TopicDiscussionLayout() {
    const classes = useStyles();

    return (
        <div >
            <Paper elevation={1} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs>
                    <TopicCard/>
                    <PostCardList index={0}/>
                </Grid>
            </Grid>
                </Paper>
        </div>
    );
}
class TopicDiscussionView extends Component{

    render() {
        console.log(this.props)
        return (
            <div>
                <TopicDiscussionLayout/>
            </div>
        );
    }
}

export default TopicDiscussionView;
