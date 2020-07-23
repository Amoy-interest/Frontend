import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBarForProfile from "../../components/profile/PofileSideBar";
import PostCardList from "../../components/post/PostCardList";
import ProfileCard from "../../components/profile/ProfileCard";
import Paper from "@material-ui/core/Paper";
import HotSearchList from "../../components/hot/HotSearchList";
import {PostType} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(1)
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
            <Paper elevation={0}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <SideBarForProfile/>
                    </Grid>
                    <Grid item xs={7}>
                        <ProfileCard/>
                        <PostCardList index={PostType.OWN}/>
                    </Grid>
                    <Grid item xs>
                        <HotSearchList/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

class ProfileView extends Component {

    render() {
        return (
            <div>
                <ProfileLayout/>
            </div>
        );
    }
}

export default ProfileView;
