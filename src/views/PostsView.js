import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from "../components/basic/SideBar";
import PostCardList from "../components/post/PostCardList";
// import {AIPickerField} from "../components/basic/AIField";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import {Field} from "formik";
// import {Select} from "formik-material-ui";
// import MenuItem from "@material-ui/core/MenuItem";
// import LoginForm from "../components/LoginForm";
// import {AITextField} from "../components/basic/AIField";
import PostCardForm from "../components/PostCardForm";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function PostsLayout() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <SideBar/>
                </Grid>
                <Grid item xs>
                    <PostCardForm/>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <PostCardList/>
                        </Grid>
                        <Grid item xs>
                            <PostCardList/>
                        </Grid>
                    </Grid>
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
                <PostsLayout/>
            </div>
        );
    }
}

export default PostsView;
