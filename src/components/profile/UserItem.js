import React, {Component} from 'react';
import {follow, unfollow} from "../../service/UserService";
import {Divider, ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {amber} from "@material-ui/core/colors";
import {Link} from "react-router-dom";

const styles = ((theme) => ({
    inline: {
        display: 'inline',
    },
    button: {
        marginLeft:theme.spacing(40)
    },
    item:{
        marginTop:theme.spacing(1)
    }
}));

@withStyles(styles)
class UserItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.user,
            followed: this.props.user._follow
        }
    }
    handleFollow = () => {
        const callback = () => {
            this.setState({followed: true});
        };
        follow(this.state.userInfo.user_id, callback);
    };

    handleUnFollow = () => {
        const callback = () => {
            this.setState({followed: false});
        };
        unfollow(this.state.userInfo.user_id, callback);
    };
    render() {
        const {userInfo,followed}=this.state;
        const {classes,index}=this.props;

        return (
            <ListItem key={index} className={classes.item}>
                <ListItemAvatar>
                    <Link style={{color: amber[200], fontSize: '18px'}} to={{
                        pathname: '/personal-info',
                        search: '?id=' + userInfo.user_id,
                    }}>
                    <Avatar alt={userInfo.nickname} src={userInfo.avatar}/>
                    </Link>
                </ListItemAvatar>
                <ListItemText
                    primary={userInfo.nickname}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {userInfo.introduction}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <Button className={classes.button} variant="outlined" color="secondary"
                        onClick={followed ? this.handleUnFollow : this.handleFollow}>
                    {followed ? "取消关注" : "关注"}
                </Button>
                <Divider/>
            {/*</ListItem>*/}
        </ListItem>);
}}
export default UserItem;
