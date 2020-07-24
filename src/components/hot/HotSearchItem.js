import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Chip from '@material-ui/core/Chip';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    number:{
        width: 30,
        color:theme.palette.text.secondary
    },
    text: {
        width: 70,
        marginLeft:'10px',
    },
    secondaryText: {
        width: 50,
        color:theme.palette.text.secondary
    },
    chip: {
        marginLeft: theme.spacing(1),
    }

}));

export default function HotSearchItem(props) {
    const classes = useStyles();

    return (
        <div>
            <ListItem button className={classes.root}>
                <Typography className={classes.number} noWrap={true} variant={'h6'}
                style={{color:props.index===0?'#ef5350':props.index===1?'#ef6c00':props.index===2?'#ffd54f':null}}>
                    <Box fontWeight="fontWeightBold" m={1}>
                        {props.index + 1}
                    </Box>
                </Typography>
                <Link style={{color: '#000', fontSize: '18px'}} to={{
                    pathname: '/topic-discussion',
                    search: '?topic_name=' + props.item.topic_name,
                }}>
                    <Typography className={classes.text} noWrap={true} variant={'subtitle1'}>
                        #{props.item.topic_name}#
                    </Typography>
                </Link>
                <Typography className={classes.secondaryText} noWrap={true} variant={'body2'}>
                    {props.item.heat}
                </Typography>
                {props.item.heat > 10000 ?
                    <Chip
                        className={classes.chip}
                        icon={<WhatshotIcon/>}
                        label='爆'
                        color="secondary"
                    /> : props.item.heat > 1000 ?
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
            </ListItem>
        </div>
    );


}
