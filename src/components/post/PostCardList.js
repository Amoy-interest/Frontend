import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import PostCard from "./PostCard";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:theme.spacing(3),
        width: '100%',
        // height: 700,
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <PostCard/>
            <Divider/>
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function PostCardList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={700} width={450} itemSize={500} itemCount={10}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
