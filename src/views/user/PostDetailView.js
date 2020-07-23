import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";
import {getPost} from "../../service/PostService";
import {PostType} from "../../utils/constants";
import PostDetail from "../../components/post/PostDetail";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

@withStyles(styles)
class PostDetailView extends Component {

    render() {
        const arr = this.props.location.search.split('&');
        const blogId = arr[0].substr(4);

        return (
            <div>
                <Paper elevation={0} className={this.props.classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={9}>
                            <PostDetail id={blogId}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <HotSearchList/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default PostDetailView;
