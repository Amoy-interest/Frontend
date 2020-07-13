import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from "../components/basic/SideBar";
import PostCardList from "../components/post/PostCardList";
import PostCardForm from "../components/PostCardForm";
import TopicHeader from "../components/topic_discussion/TopicHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function TopicDiscussionLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs>
                    <TopicHeader/>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <PostCardList/>
                        </Grid>
                        <Grid item xs>
                            <PostCardList/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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