import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import PostCardList from "../../components/post/PostCardList";
import TopicCard from "../../components/topic/TopicCard";
import HotSearchList from "../../components/hot/HotSearchList";
import withStyles from "@material-ui/core/styles/withStyles";
import {PostType, ViewType} from "../../utils/constants";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    }
});

@withStyles(styles)
class TopicDiscussionView extends Component{
    render() {
        const {classes}=this.props;


        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <SideBar viewType={ViewType.OTHERS}/>
                    </Grid>
                    <Grid item xs={7}>
                        <TopicCard location={this.props.location}/>
                        <PostCardList location={this.props.location} index={PostType.TOPIC}/>
                    </Grid>
                    <Grid item>
                        <HotSearchList viewType={ViewType.OTHERS}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TopicDiscussionView;
