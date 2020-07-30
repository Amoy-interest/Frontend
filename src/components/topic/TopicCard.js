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
import FavoriteIcon from '@material-ui/icons/Favorite';
import Background from '../../assets/img/topicbackground.jpeg'
import Grid from "@material-ui/core/Grid";
import PostForm from "../post/PostForm";
import CreateIcon from '@material-ui/icons/Create';
import Chip from "@material-ui/core/Chip";
import VisibilityIcon from '@material-ui/icons/Visibility';
import withStyles from "@material-ui/core/styles/withStyles";
import {getTopic} from "../../service/TopicService";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {connect} from "react-redux";
import PanToolIcon from '@material-ui/icons/PanTool';
import MicNoneIcon from '@material-ui/icons/MicNone';
import {UserType} from "../../utils/constants";
import Tooltip from "@material-ui/core/Tooltip";

const styles = ((theme) => ({
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor: amber[100]
    },
    root: {
        width: 660,
        marginLeft: theme.spacing(2)
    },
    header:{
        height:'8px'
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
    }
}));

function mapStateToProps(state) {
    return {
        role: state.userReducer.role
    }
};
@withStyles(styles)
class TopicCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: null,
            expanded: false,
            anchorEl:null,
            heat: 0
        };
    }

    getTopicInfo(topic_name) {
        const callback = (data) => {
            //console.log(data);
            this.setState({topic: data.data});
        };
        getTopic(topic_name, callback);
    }

    componentDidMount() {
        const arr = this.props.location.search.split('&');
        const topic_name = arr[0].substr(12);
        this.getTopicInfo(topic_name);
    }

    componentWillReceiveProps(newProps) {
        const arr = newProps.location.search.split('&');
        const topic_name = arr[0].substr(12);
        this.getTopicInfo(topic_name);
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    }
    handleTopicMenuOpen = (event) => {
        this.setState({anchorEl:event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl:null});
    };

    render() {
        const {classes} = this.props;
        const {topic, expanded,anchorEl} = this.state;
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
                    <MenuItem><CreateIcon color='primary'/>编辑</MenuItem> :
                    <MenuItem><ErrorOutlineIcon color={"secondary"}/>举报</MenuItem>
                }
            </Menu>
        );
        if (topic)
            return (
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
                                        image={topic.logo_path}
                                        title={topic.name}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <div style={{marginTop: '10px', marginLeft: '40px'}}>
                                        <Typography variant="h5" color="textPrimary" component="p" align='left'>
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
                                        <Typography variant="body2" color="textSecondary" component="p" align='left'>
                                            {topic.topic_intro}
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
                                <PostForm/>
                            </CardContent>
                        </Collapse>
                    </div>
                    {renderMenu}
                </Card>)
        else return <div>Loading...</div>
    }
}

export default connect
(mapStateToProps, null)(TopicCard);
