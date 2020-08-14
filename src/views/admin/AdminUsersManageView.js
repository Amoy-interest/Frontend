import React, {Component}from 'react';
import Grid from '@material-ui/core/Grid';
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminUser from "../../components/admin/AdminUser";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
        padding:theme.spacing(1),
        marginBottom:theme.spacing(1)
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

@withStyles(styles)
class AdminUsersManageView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            keyword: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({keyword: nextProps.keyword})
    }

    render() {
        const {classes} = this.props;
        console.log(this.props);
        return (
            <div>
                <div>
                    <Paper elevation={0} className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <AdminSideBar index={0}/>
                            </Grid>
                            <Grid item xs>
                                <AdminUser/>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default AdminUsersManageView;
