import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import PostCardList from "../../components/post/PostCardList";
import PostForm from "../../components/post/PostForm";
import Paper from "@material-ui/core/Paper";
import HotSearchList from "../../components/hot/HotSearchList";
import {PostType} from "../../utils/constants";
import {withStyles} from "@material-ui/styles";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
        minHeight:700
    },
}));

@withStyles(styles)
class PostsView extends Component{

    render() {
        const classes = this.props.classes;

        return (
            <div >
                <Paper elevation={0} className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <SideBar/>
                        </Grid>
                        <Grid item xs={7}>
                            <PostForm/>
                            <PostCardList index={PostType.FOLLOW}/>
                        </Grid>
                        <Grid item xs>
                            <HotSearchList/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default PostsView;
