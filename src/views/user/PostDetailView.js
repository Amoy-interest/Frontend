import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostDetail from "../../components/post/PostDetail";
import SimilarPostsList from "../../components/recommend/SimilarPostsList";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

@withStyles(styles)
class PostDetailView extends Component {

    render() {

        return (
            <div>
                <Paper elevation={0} className={this.props.classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={9}>
                            <PostDetail location={this.props.location}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <SimilarPostsList location={this.props.location}/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default PostDetailView;
