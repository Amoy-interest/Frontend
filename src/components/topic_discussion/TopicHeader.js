import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Background from '../../assets/topicbackground.jpeg'
import Grid from "@material-ui/core/Grid";
import PostImage1 from "../../assets/post1.png";
import PostCardForm from "../PostCardForm";
import CreateIcon from '@material-ui/icons/Create';
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage:`url(${Background})`,
        backgroundColor:amber[100]
    },
    root: {
        width: '100%',
    },
    content:{
        paddingTop:20
    },
    media: {
        height: 70,
        width:120,
        //paddingTop: '56.25%', // 16:9
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
    chip:{
        marginLeft:theme.spacing(2),
        marginBottom:10
    }
}));

export default function TopicHeader() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (

        <Card className={classes.root}>
            <div className={classes.background}>
                    {/*<CardHeader*/}
                    {/*    // avatar={*/}
                    {/*    //*/}
                    {/*    // }*/}
                    {/*    action={*/}
                    {/*        <IconButton aria-label="settings">*/}
                    {/*            <MoreVertIcon />*/}
                    {/*        </IconButton>*/}
                    {/*    }*/}
                    {/*    title="#高考结束#"*/}
                    {/*    subheader="September 14, 2016"*/}
                    {/*>*/}
                    {/*    <Avatar aria-label="recipe" className={classes.avatar}>*/}
                    {/*    R*/}
                    {/*    </Avatar>*/}
                    {/*</CardHeader>*/}
                    <CardContent className={classes.content}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <CardMedia
                                    className={classes.media}
                                    image={PostImage1}
                                    title="沙滩"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h4" color="textPrimary" component="p" align='left'>
                                    #高考结束#
                                    <Chip
                                        size={"large"}
                                        icon={<FaceIcon />}
                                        label="校园"
                                        color="secondary"
                                        variant="outlined"
                                        className={classes.chip}
                                    />
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align='left'>
                                   点击量：3亿 关注人数：3000
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <VisibilityIcon/>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <CreateIcon />
                        </IconButton>
                    </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <PostCardForm/>
                    </CardContent>
                </Collapse>
            </div>
        </Card>

    );
}
