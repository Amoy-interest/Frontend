import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBarForProfile from "../../components/profile/PofileSideBar";
import PostCardList from "../../components/post/PostCardList";
import ProfileCard from "../../components/profile/ProfileCard";
import Paper from "@material-ui/core/Paper";
import HotSearchList from "../../components/hot/HotSearchList";
import {PostType} from "../../utils/constants";
import withStyles from "@material-ui/core/styles/withStyles";

const styles =((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(1)
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

@withStyles(styles)
class ProfileView extends Component {

    render() {
        const {classes}=this.props;

        return (
            <div className={classes.root}>
                <Paper elevation={0}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <SideBarForProfile/>
                        </Grid>
                        <Grid item xs={7}>
                            <ProfileCard {...this.props}/>
                            <PostCardList index={PostType.OWN} {...this.props}/>
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

export default ProfileView;
