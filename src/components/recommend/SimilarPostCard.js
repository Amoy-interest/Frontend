import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {amber,} from '@material-ui/core/colors';
import PostImage from "../post/PostImage";
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import grey from "@material-ui/core/colors/grey";

const styles = (theme => ({
    root: {
        //backgroundColor: grey[50],
        paddingBottom: '30px',
        width:'260px'
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    }
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

@withStyles(styles)
class SimilarPostCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
        };
    };

    render() {
        const {post} = this.state;
        const {classes} = this.props;

        if (this.state.post !== null)
            return (

                <div>
                    <Card className={classes.root} elevation={1}>
                        <CardHeader
                            avatar={
                                <Link style={{color: amber[200], fontSize: '18px'}}
                                      to={{
                                          pathname: '/personal-info',
                                          search: '?id=' + post.user_id,
                                      }}>
                                    <Avatar src={post.avatar_path} className={classes.avatar}/>
                                </Link>
                            }
                            title={post.nickname}
                            subheader={new Date(post.blog_time).Format("yyyy-MM-dd hh:mm:ss")}
                        />
                        <Link style={{color: grey[50]}} to={{
                            pathname: '/post-detail',
                            search: '?id=' + post.blog_id
                        }}>
                            <CardContent>
                                <Typography variant="body1" color="textPrimary" component="p">
                                    {post.blog_content.text}
                                </Typography>
                            </CardContent>
                            <PostImage image={post.blog_content.images} height={150}/>
                        </Link>
                    </Card>
                </div>
            );
        else return <div>Loading</div>;
    }
}

export default connect
(mapStateToProps, null)(SimilarPostCard);
