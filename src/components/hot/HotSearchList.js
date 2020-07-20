import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
// import StarIcon from '@material-ui/icons/Star';
import { FixedSizeList } from 'react-window';
import PropTypes from "prop-types";
import HotSearchItem from "./HotSearchItem";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 280,
        position:'fixed',
        color: theme.palette.text.secondary,
    },
    title: {
        marginTop:10
    }
}));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <HotSearchItem index={index}/>
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};
export default function HotSearchList() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h6">热搜榜</Typography>
            <FixedSizeList height={360} width={280} itemSize={50} itemCount={60}>
                {renderRow}
            </FixedSizeList>
        </Paper>
    );
}
