import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core/styles";
import {getSimilarUsers} from "../../service/RecommendService";
import {Grid} from "@material-ui/core";
import {MessageType, MsgType} from "../../utils/constants";
import PubSub from "pubsub-js";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import {amber} from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";

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
        opacity: 0.80,
        marginBottom:theme.spacing(2),
    },
    userContainer:{
       padding: theme.spacing(1),
    },
    user: {
        width: '100%',
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        marginLeft:theme.spacing(2)
    }
}));

@withStyles(styles)
class SimilarUsersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    };

    getUsers(props) {
        const arr = props.location.search.split('&');
        const userId = arr[0].substr(4);
        let param = {user_id: userId, limit_count: 9};
        const callback = (data) => {
            console.log(data);
            if (data.status !== 200)
                PubSub.publish(MsgType.SET_MESSAGE, {
                    text: '获取相关用户失败',
                    type: MessageType.ERROR
                });
            else this.setState({
                users: data.data.list
            });
        };
        getSimilarUsers(param, callback);
    };

    componentDidMount() {
        this.getUsers(this.props);
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.getUsers(nextProps);
    };

    render() {
        const {classes} = this.props;
        const {users} = this.state;

        return (
            <Paper>
                <div className={classes.root}>
                    <div className={classes.title}>
                        <Typography variant="h5">
                            <Box fontWeight="fontWeightBold" fontFamily="Monospace" m={1}>
                                相关用户
                            </Box>
                        </Typography>
                    </div>
                    <div className={classes.userContainer}>
                    <Grid container spacing={1} alignItems="stretch">
                        {users.map((item, value) => {
                            return (
                                <Grid key={`postImage-${value}`} item xs={4}>
                                    <Tooltip title={item.nickname}>
                                        <div className={classes.user}>
                                            <Link style={{color: amber[200], fontSize: '18px'}} to={{
                                                pathname: '/personal-info',
                                                search: '?id=' + item.user_id,
                                            }}>
                                                <Avatar className={classes.avatar} src={item.avatar}/>
                                            </Link>
                                            <Typography variant="subtitle2" color="textSecondary" noWrap={true}>
                                                {item.nickname}
                                            </Typography>
                                        </div>
                                    </Tooltip>
                                </Grid>
                            );
                        })}
                    </Grid>
                    </div>
                </div>
            </Paper>
        );
    }

}

export default SimilarUsersList;
