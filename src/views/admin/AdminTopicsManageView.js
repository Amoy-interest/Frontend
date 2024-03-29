import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminTopicsList from "../../components/admin/AdminTopicsList";
import Paper from "@material-ui/core/Paper";

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
class AdminTopicsManageView extends Component{

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
                            <AdminSideBar index={2}/>
                        </Grid>
                        <Grid item xs>
                            <AdminTopicsList keyword={this.state.keyword}/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default AdminTopicsManageView;
