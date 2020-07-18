import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from "../../components/commen/SideBar";
import PostCardList from "../../components/post/PostCardList";
import PostForm from "../../components/post/PostForm";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(1)
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function PostsLayout() {
    const classes = useStyles();

    return (
        <div >
            <Paper elevation={1} className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs>
                        <PostForm/>
                        <PostCardList index={2}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
class PostsView extends Component{

    render() {
        console.log(this.props)
        return (
            <div>
                <PostsLayout/>
            </div>
        );
    }
}

export default PostsView;
