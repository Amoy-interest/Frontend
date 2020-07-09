import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TravelImage from '../assets/travel.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '100%',
    },
}));

export default function NewsCarousel() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <img className={classes.cover} src={TravelImage} alt={'旅行'} />
    );
}

