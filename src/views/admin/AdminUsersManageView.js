import React, {Component}from 'react';
import Grid from '@material-ui/core/Grid';
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminUserList from "../../components/admin/tables/AdminUserList";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import AdminUnBanList from "../../components/admin/tables/AdminUnBanList";
import AdminUnForbidList from "../../components/admin/tables/AdminUnForbidList";

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

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    <Paper elevation={0} className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <AdminSideBar index={0}/>
                            </Grid>
                            <Grid item xs>
                                {/*<AdminUserList/>*/}
                                <Switch>
                                    <Route
                                        exact path="/users-manage/cancel_ban"
                                        component={AdminUnBanList}
                                    />
                                    <Route
                                        exact path="/users-manage/cancel_forbid"
                                        component={AdminUnForbidList}
                                    />
                                    <Route component={AdminUserList}/>
                                </Switch>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default AdminUsersManageView;
