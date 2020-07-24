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
    number: {},
    text: {
        width: 70,
        //marginLeft: theme.spacing(1),
    },
    secondaryText: {
        marginLeft: theme.spacing(2),
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
                    <Typography className={classes.text} noWrap={true} variant={'subtitle2'}>
                        <Box textAlign="center" lineHeight={2} m={1}>
                            #{props.item.topic_name}#
                        </Box>
                    </Typography>
                </Link>
                <ListItemText className={classes.secondaryText} secondary={props.item.heat}/>
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
