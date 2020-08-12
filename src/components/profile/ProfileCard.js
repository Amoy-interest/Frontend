import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from "@material-ui/core/Avatar";
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {amber, red} from '@material-ui/core/colors';
import Background from '../../assets/img/background8.png'
import Grid from "@material-ui/core/Grid";
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import {follow, getUserInfo, unfollow} from "../../service/UserService";
import {connect} from "react-redux";

const styles = ((theme) => ({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: amber[100],
        width:'100%'
    },
    root: {
        width: 660,
        marginLeft:theme.spacing(2),
        marginTop:theme.spacing(1)
    },
    content: {
        paddingTop: 20
    },
    media: {
        height: 70,
        width: 120,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: 100,
        height: 100,
        marginBottom:10,
        marginLeft:45
    },
    chip: {
        marginLeft: theme.spacing(2),
        marginBottom: 10
    }
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer,
        role: state.userReducer.role
    }
};

@withStyles(styles)
class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            anchorEl:null,
            followed:false
        };
    }

    update(props){
        const param = props.location.search.split('&');
        const user_id = param[0].substr(4);
        getUserInfo(user_id, (data)=>{
            console.log(data);
            this.setState({userInfo:data.data.user, followed:data.data.user._follow});
        });
    }

    componentDidMount() {
        console.log("ProfileCard componentDidMount", this.props.history);
        this.update(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext){
        this.update(nextProps);
    }

    handleProfileMenuOpen = (event) => {
        this.setState({anchorEl:event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl:null});
    };

    handleEdit = () => {
        this.handleMenuClose();
    };
    handleFollow=()=>{
        const callback=()=> {
            this.setState({followed: true});
        };
        follow(this.state.userInfo.user_id,callback);
    };

    handleUnFollow=()=>{
        const callback=()=> {
            this.setState({followed: false});
        };
        unfollow(this.state.userInfo.user_id,callback);
    };

    render() {
        const {classes}=this.props;
        const {anchorEl,userInfo,followed}=this.state;
        const isMenuOpen = Boolean(anchorEl);
        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleEdit}><CreateIcon color='primary'/>编辑</MenuItem>
            </Menu>
        );
        if(this.state.userInfo===null) return <div>Loading</div>;
        else
        {return (
            <Card className={classes.root} >
                <div className={classes.background}>
                    <CardHeader
                        action={
                            <IconButton onClick={this.handleProfileMenuOpen} aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                    />
                    <CardContent className={classes.content}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs>
                                <Avatar aria-label="profile" className={classes.avatar} src={userInfo.avatar}/>
                            </Grid>
                            <Grid item xs>
                            </Grid>
                        </Grid>
                        <Typography variant="h5" color="textPrimary" align='center'>
                            {userInfo.nickname}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" align='center'>
                            {userInfo.address}
                        </Typography>
                        <div style={{marginTop: '10px'}}>
                            <Typography variant="body1" color="textPrimary" component="p" align='center'>
                                简介: {userInfo.introduction}
                            </Typography>
                        </div>
                        {userInfo.user_id === this.props.user.user.user_id ?null:
                            <div style={{marginTop: '20px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                    </Grid>

                                    <Grid item xs>
                                        <Button variant="contained" color="primary"
                                                onClick={followed ? this.handleUnFollow : this.handleFollow}>
                                            {followed ? "取消关注" : "关注"}
                                        </Button>
                                        <Button variant="contained" color="primary" style={{marginLeft: '8px'}}>
                                            私信
                                        </Button>
                                    </Grid>
                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                            </div>
                        }
                    </CardContent>
                    {renderMenu}
                </div>
            </Card>)}
    }

}
export default connect(
    mapStateToProps, null
)(ProfileCard)
