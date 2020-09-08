import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import {useHistory} from "react-router-dom";

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
        width: 90,
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
    const history = useHistory();
    const goto = () => {
        history.push({pathname: '/topic-discussion', state: {topic_name: props.item.topic_name}});
    };
    return (
            <ListItem button style={props.style} className={classes.root} onClick={goto.bind(this)} key={props.item.topic_name}>
                <Typography className={classes.number} noWrap={true} variant={'h6'}
                style={{color:props.index===0?'#ef5350':props.index===1?'#ef6c00':props.index===2?'#ffd54f':null}}>
                    <Box fontWeight="fontWeightBold" m={1}>
                        {props.index + 1}
                    </Box>
                </Typography>
                    <Typography className={classes.text} noWrap={true} variant={'subtitle1'}>
                        #{props.item.topic_name}#
                    </Typography>
                <Typography className={classes.secondaryText} noWrap={true} variant={'body2'}>
                    {props.item.heat}
                </Typography>
                {props.item.heat > 1000 ?
                    <Chip
                        className={classes.chip}
                        icon={<WhatshotIcon/>}
                        label='爆'
                        color="secondary"
                    /> : props.item.heat > 100 ?
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
    );


}
