import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import SideBarForProfile from "../../components/profile/PofileSideBar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import SimilarUsersList from "../../components/recommend/SimilarUsersList";

const styles =((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(1),
        //alignItems: 'center',
        //padding:theme.spacing(1)
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
                        <Grid item xs={9}>
                            <SideBarForProfile location={this.props.location}/>
                        </Grid>
                        <Grid item xs>
                            <SimilarUsersList location={this.props.location}/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default ProfileView;
