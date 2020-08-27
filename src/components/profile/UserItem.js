import React, {Component} from 'react';
import {follow, unfollow} from "../../service/UserService";
import {Divider, ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import {UserListBelong} from "./UserList";

const styles = ((theme) => ({
    inline: {
        display: 'inline',
    },
    button: {
        marginLeft:theme.spacing(25)
    },
    item:{
        marginTop:theme.spacing(1)
    },
    avatar:{
        backgroundColor:theme.palette.primary.main
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
    };

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
        const {classes,key,type}=this.props;
        console.log(type);
        return (
            <ListItem key={key} className={classes.item}>
                <ListItemAvatar>
                    <Link to={{
                        pathname: '/personal-info',
                        search: '?id=' + userInfo.user_id,
                    }}>
                    <Avatar alt={userInfo.nickname} src={userInfo.avatar} className={classes.avatar}/>
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
                {type===UserListBelong.PERSONAL?
                <Button className={classes.button} variant="outlined" color="secondary"
                        onClick={followed ? this.handleUnFollow : this.handleFollow}>
                    {followed ? "取消关注" : "关注"}
                </Button>:null}
                <Divider/>
            {/*</ListItem>*/}
        </ListItem>);
}}
export default UserItem;
