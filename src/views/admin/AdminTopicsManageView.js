import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import PostCardList from "../../components/post/PostCardList";
// import PostCardForm from "../../components/PostCardForm";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminTopicsList from "../../components/admin/AdminTopicsList";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:theme.spacing(3),
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
                    <AdminSideBar index={2}/>
                </Grid>
                <Grid item xs>
                    <AdminTopicsList/>
                </Grid>
            </Grid>
                </Paper>
        </div>
    );
}

class AdminTopicsManageView extends Component{

    render() {
        console.log(this.props)
        return (
            <div>
                <PostsLayout/>
            </div>
        );
    }
}

export default AdminTopicsManageView;
