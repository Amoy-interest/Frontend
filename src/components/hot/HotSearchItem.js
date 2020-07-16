import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
// import StarIcon from '@material-ui/icons/Star';
// import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    number:{

    },
    text:{
        marginLeft:theme.spacing(1)
    },
    secondaryText:{
        marginLeft:theme.spacing(1),
        fontSize:'20px'
    },
    chip:{
        marginLeft:theme.spacing(2),
    }

}));
export default function HotSearchItem(props) {
    const classes = useStyles();
    const history = useHistory();

    const openTopicView=()=>{
        history.replace('/topic-discussion');
    }
    return(
        <div>
            <ListItem button className={classes.root} onClick={openTopicView}>
                {/*<ListItemIcon>*/}
                {/*    <StarIcon color={"secondary"}/>*/}
                {/*</ListItemIcon>*/}
                <ListItemText className={classes.number} primary={`${props.index + 1}`} />
                <ListItemText className={classes.text} primary="高考" />
                <ListItemText className={classes.secondaryText} secondary="232400"/>
                <Chip
                    size={"small"}
                    icon={<FaceIcon />}
                    label="校园"
                    color="secondary"
                    variant="outlined"
                    className={classes.chip}
                />
            </ListItem>
        </div>
    );


}
