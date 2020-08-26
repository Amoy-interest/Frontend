import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {amber, red} from '@material-ui/core/colors';
import Background from '../../assets/img/background7.png'
import Grid from "@material-ui/core/Grid";
import PostForm from "../post/PostForm";
import CreateIcon from '@material-ui/icons/Create';
import Chip from "@material-ui/core/Chip";
import withStyles from "@material-ui/core/styles/withStyles";
import {editTopicIntro, getTopic, editTopicLogo, reportTopic} from "../../service/TopicService";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {connect} from "react-redux";
import MicNoneIcon from '@material-ui/icons/MicNone';
import {defaultImgUrl, MessageType, MsgType, UserType} from "../../utils/constants";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import TopicEditForm from "./TopicEditForm";
import PubSub from "pubsub-js";

const styles = ((theme) => ({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: amber[100]
    },
    root: {
        width: 660,
        marginLeft: theme.spacing(2),
        marginTop:theme.spacing(2)
    },
    header: {
        height: '8px'
    },
    content: {
        //paddingTop: 40,
    },
    media: {
        height: 80,
        width: 120,
        marginLeft: 5
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
        backgroundColor: red[500],
    },
    chip: {
        marginLeft: theme.spacing(3),
        marginBottom: 10
    },
    paper: {
        position: 'absolute',
    },
    editModal: {
        padding: theme.spacing(1),
        width: 500
    }
}));

function mapStateToProps(state) {
    return {
        role: state.userReducer.role
    }
}

function getModalStyle() {
    const top = 50;
    const left = 47;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

@withStyles(styles)
class TopicCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: null,
            image: null,
            introduction: null,
            expanded: false,
            anchorEl: null,
            editModalOpen: false,
        };
    };

    getTopicInfo(topic_name) {
        const callback = (data) => {
            this.setState({
                topic: data.data,
                image: data.data.logo_path === null ? defaultImgUrl: data.data.logo_path,
                introduction: data.data.topic_intro
            });
        };
        getTopic(topic_name, callback);
    };

    componentDidMount() {
        const topic_name =  this.props.location.state.topic_name;
        this.getTopicInfo(topic_name);
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext){
        const topic_name =  nextProps.location.state.topic_name;
        this.getTopicInfo(topic_name);
    };

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    handleTopicMenuOpen = (event) => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleEditClick = () => {
        this.handleEditModalOpen();
        this.handleMenuClose();
    };

    handleEditModalOpen = () => {
        this.setState({editModalOpen: true});
    };

    handleEditModalClose = () => {
        this.setState({editModalOpen: false});
    };

    handleReport=()=>{
        const callback = (data) => {
            if(data.status===200){
                PubSub.publish(MsgType.SET_MESSAGE, {
                    text: "举报成功！", type: MessageType.SUCCESS});
                this.handleMenuClose();
            }
            else{
                PubSub.publish(MsgType.SET_MESSAGE, {
                    text: "举报失败！", type: MessageType.ERROR});
                this.handleMenuClose();
            }
        };
        const data={topic_name:this.state.topic.name}
        console.log(data);
        reportTopic(data,callback)
    };

    submitEdit = (data) => {
        console.log(data);

        const callback1 = (data) => {
            console.log(data);
            this.setState({topic: data.data, intro: data.data.topic_intro});
            this.handleEditModalClose();
        };

        const callback2 = (data) => {
            this.setState({topic: data.data, image: data.data.logo_path});
            this.handleEditModalClose();
        };

        if (data.text !== this.state.introduction) {
            let intro = {
                topic_name: this.state.topic.name,
                topic_intro: data.text
            };
            editTopicIntro(intro, callback1)
        }

        if (data.url.url !== this.state.image) {
            let logo = {
                topic_name: this.state.topic.name,
                logo_path: data.url.url
            };
            editTopicLogo(logo, callback2)
        }
        if (!this.state.editModalOpen) this.handleEditModalClose();
    };

    render() {
        const {classes} = this.props;
        const {topic, image, introduction, expanded, anchorEl, editModalOpen} = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const menuId = 'topic-menu';
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
                {this.props.role === UserType.ADMIN ?
                    <MenuItem onClick={this.handleEditClick}><CreateIcon color='primary'/>编辑</MenuItem> :
                    <MenuItem onClick={this.handleReport}><ErrorOutlineIcon color={"secondary"}/>举报</MenuItem>
                }
            </Menu>
        );
        if (topic)
            return (
                <div>
                    <Card className={classes.root}>
                        <div className={classes.background}>
                            <CardHeader className={classes.header}
                                        action={
                                            <IconButton onClick={this.handleTopicMenuOpen} aria-label="settings">
                                                <MoreVertIcon/>
                                            </IconButton>
                                        }
                            />
                            <CardContent className={classes.content}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <CardMedia
                                            className={classes.media}
                                            image={image}
                                            title={topic.name}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <div style={{marginTop: '10px', marginLeft: '40px'}}>
                                            <Typography variant="h5" color="textPrimary" align='left'>
                                                #{topic.name}#
                                                {topic.topic_heat > 10000 ?
                                                    <Chip
                                                        className={classes.chip}
                                                        icon={<WhatshotIcon/>}
                                                        label='爆'
                                                        color="secondary"
                                                    /> : topic.topic_heat > 1000 ?
                                                        <Chip
                                                            className={classes.chip}
                                                            icon={<WhatshotIcon/>}
                                                            label='热'
                                                            color="primary"
                                                        /> :
                                                        <Chip
                                                            className={classes.chip}
                                                            icon={<WhatshotIcon/>}
                                                            label='沸'
                                                        />}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p"
                                                        align='left'>
                                                {introduction}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions disableSpacing>
                                {/*<IconButton aria-label="add to favorites" style={{marginLeft: '10px'}}>*/}
                                {/*    <FavoriteIcon/>*/}
                                {/*</IconButton>*/}
                                {/*<IconButton aria-label="share">*/}
                                {/*    <VisibilityIcon/>*/}
                                {/*</IconButton>*/}
                                <Tooltip title="成为主持人">
                                    <IconButton aria-label="handup">
                                        <MicNoneIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"发博"}>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={this.handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <CreateIcon/>
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <PostForm tag={topic.name}/>
                                </CardContent>
                            </Collapse>
                        </div>
                        {renderMenu}
                    </Card>
                    <Modal open={editModalOpen} onClose={this.handleEditModalClose}>
                        <div style={getModalStyle()} className={classes.paper}>
                            <Paper className={classes.editModal}>
                                <TopicEditForm closeModal={this.handleEditModalClose} text={introduction}
                                               image={image} submit={this.submitEdit}/>
                            </Paper>
                        </div>
                    </Modal>
                </div>);
        else return <div>Loading...</div>
    };
};

export default connect
(mapStateToProps, null)(TopicCard);
