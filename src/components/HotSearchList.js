import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function HotSearchList() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h6">热搜榜</Typography>
            <List component="nav" className={classes.root} aria-label="contacts">
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText primary="1"/>
                    <ListItemText primary="高考结束" />
                    <ListItemText secondary="232400"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText primary="2"/>
                    <ListItemText primary="全国高校名单" />
                    <ListItemText secondary="125660"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText primary="3"/>
                    <ListItemText primary="望庐山瀑布" />
                    <ListItemText secondary="100200"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText primary="4"/>
                    <ListItemText primary="孙莉跳舞" />
                    <ListItemText secondary="98890"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText primary="5"/>
                    <ListItemText primary="王者荣耀更新" />
                    <ListItemText secondary="89909"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <StarIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText primary="6"/>
                    <ListItemText primary="德普" />
                    <ListItemText secondary="78880"/>
                </ListItem>
            </List>
        </div>
    );
}
