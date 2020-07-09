import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { FixedSizeList } from 'react-window';
import PostCard from "./PostCard";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:theme.spacing(3),
        width: '100%',
        maxWidth: 485,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function PostCardList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List>
                <ListItem button>
                    <PostCard/>
                    <Divider/>
                </ListItem>
                <ListItem button>
                    <PostCard/>
                    <Divider/>
                </ListItem>
                <ListItem button>
                    <PostCard/>
                    <Divider/>
                </ListItem>
            </List>
        </div>
    );
}
