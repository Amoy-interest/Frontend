import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import PostImage1 from "../../assets/post1.png";
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //maxWidth: 900,
        backgroundColor: theme.palette.background.paper,
    },
    item: {
        width: '100%',
        height: 100,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function AdminPostsList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <div style={{marginTop:'30px',marginBottom:'30px'}}>
                <Button variant="contained" color="secondary">
                    屏蔽所选博文
                </Button>
                <Button variant="contained" color="secondary" style={{marginLeft: '20px'}}>
                    删除所选博文
                </Button>
            </div>
            <List className={classes.root}>
                {[0, 1, 2, 3, 4, 5,6,7,8,10,11,12,13].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}
                                  className={classes.item}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value + 1}`}
                                    src={PostImage1}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`博文 ${value + 1}`}/>
                            <ListItemText id={labelId} primary={`发帖用户id ${10000 - value + 1}`}/>
                            <ListItemText id={labelId} primary={`浏览次数${100 - value + 1}`}/>
                            {/*<TopicHeader/>*/}
                            <ListItemSecondaryAction>
                                <Tooltip title={"屏蔽"}>
                                    <IconButton edge="end" aria-label="ban" style={{marginLeft: '8px'}}>
                                        <BlockIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"删除"}>
                                    <IconButton edge="end" aria-label="micoff">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}
