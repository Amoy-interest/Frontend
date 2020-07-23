import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import PostCardList from "../../components/post/PostCardList";
import TopicCard from "../../components/topic/TopicCard";
import HotSearchList from "../../components/hot/HotSearchList";
import withStyles from "@material-ui/core/styles/withStyles";
import {PostType} from "../../utils/constants";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(1)
    }
});

@withStyles(styles)
class TopicDiscussionView extends Component{

    render() {
        const {classes}=this.props;
        const arr = this.props.location.search.split('&');
        const topic_name = arr[0].substr(4);
        console.log(topic_name);

        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={7}>
                        <TopicCard topic_name={topic_name}/>
                        <PostCardList topic_name={topic_name} index={PostType.TOPIC}/>
                    </Grid>
                    <Grid item>
                        <HotSearchList/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TopicDiscussionView;
