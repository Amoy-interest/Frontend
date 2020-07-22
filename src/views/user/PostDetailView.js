import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";
import {getPost} from "../../service/PostService";
import {PostType} from "../../utils/constants";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

@withStyles(styles)
class PostDetailView extends Component {

    componentDidMount() {
        const query = this.props.location.search;
        const arr = query.split('&');
        const blogId = arr[0].substr(4);
        const callback=(data)=>{
            console.log(data);
        };
        getPost(blogId,callback);
    };
    render() {
        return (
            <div>
                <Paper elevation={0} className={this.props.classes.root}>
                    <Grid container >
                        <Grid item xs={12} sm={9}>
                            <PostCardList index={PostType.OWN}/>
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
