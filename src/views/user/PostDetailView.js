import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";
import {getPost} from "../../service/PostService";

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
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <SideBar/>
                        </Grid>
                        <Grid item xs={7}>
                            <PostCardList index={1}/>
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

export default PostDetailView;
