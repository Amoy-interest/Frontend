import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import Carousel from "../../components/commen/Carousel";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";
import {getPost} from "../../service/PostService";
import {dark} from "@material-ui/core/styles/createPalette";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function PostDetailLayout() {
    const classes = useStyles();

    return (
        <div>
            <Paper elevation={0} className={classes.root}>
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

class PostDetailView extends Component {
    constructor(props) {
        super(props);
    };

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
                <PostDetailLayout/>
            </div>
        );
    }
}

export default PostDetailView;
