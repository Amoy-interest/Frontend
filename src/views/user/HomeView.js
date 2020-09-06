import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import Carousel from "../../components/commen/Carousel";
import HotSearchList from "../../components/hot/HotSearchList";
import PostCardList from "../../components/post/PostCardList";
import {PostType} from "../../utils/constants";
import {withStyles} from "@material-ui/styles";

const styles = ((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:theme.spacing(1)
    },
}));

@withStyles(styles)
class HomeView extends Component {

    render() {
        const {classes} = this.props;

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
}

export default HomeView;
