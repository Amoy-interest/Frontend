import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/basic/SideBar";
import NewsCarousel from "../../components/NewsCarousel";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(1)
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    hot:{
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
                    <Paper className={classes.paper}><NewsCarousel/></Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.hot}><HotSearchList/></Paper>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs>
                    <PostCardList/>
                </Grid>
                <Grid item xs>
                    <PostCardList/>
                </Grid>
            </Grid>
            </Paper>
        </div>
    );
}
class HomeView extends Component{

    render() {
        return (
            <div>
                <HomeLayout/>
            </div>
        );
    }
}

export default HomeView;
