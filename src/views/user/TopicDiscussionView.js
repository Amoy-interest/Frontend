import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import PostCardList from "../../components/post/PostCardList";
import TopicCard from "../../components/topic/TopicCard";
import HotSearchList from "../../components/hot/HotSearchList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(1)
    }
}));

function TopicDiscussionLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs={7}>
                    <TopicCard/>
                    <PostCardList index={0}/>
                </Grid>
                <Grid item>
                    <HotSearchList/>
                </Grid>
            </Grid>
        </div>
    );
}
class TopicDiscussionView extends Component{

    render() {
        console.log(this.props);
        return (
            <div>
                <TopicDiscussionLayout/>
            </div>
        );
    }
}

export default TopicDiscussionView;
