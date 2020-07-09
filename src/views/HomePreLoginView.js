import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../components/basic/SideBar";
import NewsCarousel from "../components/NewsCarousel";
import HotSearchList from "../components/HotSearchList";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //paddingTop: theme.spacing(3),
    },
    paper: {
        //padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function HomeLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs={7}>
                    <Paper className={classes.paper}><NewsCarousel/></Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}><HotSearchList/></Paper>
                </Grid>
            </Grid>
        </div>
    );
}
class HomePreLoginView extends Component{

    render() {
        return (
            <HomeLayout/>
        );
    }
}

export default HomePreLoginView;

