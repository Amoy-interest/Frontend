import React, {Component} from 'react';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import SideBar from "../components/basic/SideBar";
// import NewsCarousel from "../components/NewsCarousel";
// import HotSearchList from "../components/hot/HotSearchList";
import PostCardList from "../components/post/PostCardList";
import SideBarForPofile from "../components/basic/SideBarForPofile";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function ProfileLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <SideBarForPofile/>
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
class PersonalInfoView extends Component{

    render() {
        console.log(this.props)
        return (
            <div>
                <ProfileLayout/>
                {/*<Button variant="contained" color="primary">go to home</Button>*/}
            </div>
        );
    }
}

export default PersonalInfoView;
