import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Chip from '@material-ui/core/Chip';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    number: {},
    text: {
        marginLeft: theme.spacing(1)
    },
    secondaryText: {
        marginLeft: theme.spacing(1),
        fontSize: '20px'
    },
    chip: {
        marginLeft: theme.spacing(5),
    }

}));
export default function HotSearchItem(props) {
    const classes = useStyles();

    return (
        <div>
            <ListItem button className={classes.root}>
                <ListItemText className={classes.number} primary={`${props.index + 1}`}/>
                <Link style={{color: '#000', fontSize: '18px'}} to={{
                    pathname: '/topic-discussion',
                    search: '?topic_name=' + props.item.topic_name,
                }}>
                <ListItemText className={classes.text} primary={`#${props.item.topic_name}#`}/>
                </Link>
                <ListItemText className={classes.secondaryText} secondary={props.item.heat}/>
                {props.item.heat>10000?
                <Chip
                    className={classes.chip}
                    icon={<WhatshotIcon/>}
                    label='爆'
                    color="secondary"
                />:props.item.heat>1000?
                <Chip
                    className={classes.chip}
                    icon={<WhatshotIcon/>}
                    label='热'
                    color="primary"
                />:
                <Chip
                    className={classes.chip}
                    icon={<WhatshotIcon/>}
                    label='沸'
                    //color=""
                />}
            </ListItem>
        </div>
    );


}
