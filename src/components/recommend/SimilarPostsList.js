import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core/styles";
import {getSimilarPosts} from "../../service/RecommendService";
import {Divider, List} from "@material-ui/core";
import {MessageType, MsgType} from "../../utils/constants";
import PubSub from "pubsub-js";
import Paper from "@material-ui/core/Paper";
import SimilarPostCard from "./SimilarPostCard";

const styles = ((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column',
    },
    title: {
        // marginBottom: 10,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        opacity: 0.80
    },
}));

@withStyles(styles)
class SimilarPostsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    };
    getPosts(props) {
        const arr = props.location.search.split('&');
        const blogId = arr[0].substr(4);
        let param = {blog_id: blogId,limit_count:8};
        const callback = (data) => {
            if (data.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {
                    text: '获取相关博文失败',
                    type: MessageType.ERROR
                });
            else this.setState({
                posts:data.data.list
            });
        };
        getSimilarPosts(param,callback);
    };

    componentDidMount() {
        this.getPosts(this.props);
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext){
        this.getPosts(nextProps);
    };

    render() {
        const {classes} = this.props;
        const {posts} = this.state;

        return (
            <Paper>
                <div className={classes.root}>
                    <div className={classes.title}>
                        <Typography variant="h5">
                            <Box fontWeight="fontWeightBold" fontFamily="Monospace" m={1}>
                            相关博文
                            </Box>
                        </Typography>
                    </div>
                    <List>
                        {posts.map((item, index) => {
                            return (
                                <ListItem key={index}>
                                    <SimilarPostCard post={item}/>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Paper>
        );
    }

}

export default SimilarPostsList;
