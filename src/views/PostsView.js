import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../components/basic/SideBar";
import NewsCarousel from "../components/NewsCarousel";
import HotSearchList from "../components/HotSearchList";
import PostCardList from "../components/post/PostCardList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function HomeLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs>
                    <PostCardList/>
                </Grid>
                <Grid item xs>
                    <PostCardList/>
                </Grid>
            </Grid>
        </div>
    );
}
class PostsView extends Component{

    render() {
        console.log(this.props)
        return (
            <div>
                <HomeLayout/>
            </div>
        );
    }
}

export default PostsView;