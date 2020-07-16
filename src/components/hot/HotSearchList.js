import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
// import StarIcon from '@material-ui/icons/Star';
import { FixedSizeList } from 'react-window';
import PropTypes from "prop-types";
import HotSearchItem from "./HotSearchItem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
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
        <div>
            <Typography className={classes.title} variant="h6">热搜榜</Typography>
            <FixedSizeList height={357} width={273} itemSize={50} itemCount={60}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
