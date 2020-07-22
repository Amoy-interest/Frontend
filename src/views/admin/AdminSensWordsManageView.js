import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminSensWordsList from "../../components/admin/AdminSensWordsList";

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
                        <AdminSideBar index={3}/>
                    </Grid>
                    <Grid item xs>
                        <AdminSensWordsList/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
class AdminSensWordsManageView extends Component{

    render() {
        console.log(this.props);
        return (
            <div>
                <PostsLayout/>
            </div>
        );
    }
}

export default AdminSensWordsManageView;
