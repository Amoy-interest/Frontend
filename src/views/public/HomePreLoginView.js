import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import Carousel from "../../components/commen/Carousel";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    hot: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

function HomeLayout() {
    const classes = useStyles();

    return (
        <div >
            <Paper elevation={1} className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={classes.paper}><Carousel/></Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.hot}><HotSearchList/></Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs>
                        <PostCardList index={0}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

class HomePreLoginView extends Component {

    render() {
        return (
            <HomeLayout/>
        );
    }
}

export default HomePreLoginView;

