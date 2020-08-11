import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import Carousel from "../../components/commen/Carousel";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";
import {PostType} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function HomeLayout() {
    const classes = useStyles();

    return (
        <div>
            <Paper elevation={0} className={classes.root}>
                <Carousel/>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={7}>
                        <PostCardList index={PostType.RECOMMEND}/>
                    </Grid>
                    <Grid item xs>
                        <HotSearchList/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

class HomeView extends Component {

    render() {
        return (
            <div>
                <HomeLayout/>
            </div>
        );
    }
}

export default HomeView;
