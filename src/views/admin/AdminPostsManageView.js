import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminPostsList from "../../components/admin/AdminPostsList";
import AdminTopicsList from "../../components/admin/AdminTopicsList";

const styles = ((theme) => ({
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

@withStyles(styles)
class AdminPostsManageView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            keyword: null
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.keyword);
        this.setState({keyword: nextProps.keyword})
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Paper elevation={1} className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <AdminSideBar index={1}/>
                        </Grid>
                        <Grid item xs>
                            <AdminPostsList keyword={this.state.keyword}/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default AdminPostsManageView;
