import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        maxHeight: 600
    },
}));

export default function PostImage(props) {
    const classes = useStyles();
    if (props.image === null) return null;

    const imageCount = props.image.length;
    const height = props.height ?
        (imageCount === 1 && props.height) ||
        (imageCount >= 2 && imageCount <= 4 && props.height * 0.6) ||
        (imageCount >= 5 && imageCount <= 9 && props.height * 0.4) :
        (imageCount === 1 && 600) ||
        (imageCount >= 2 && imageCount <= 4 && 400) ||
        (imageCount >= 5 && imageCount <= 9 && 200)

    return (
        <div className={classes.root}>
            <meta name="referrer" content="no-referrer" />
            <Grid container spacing={1} alignItems="stretch">
                {props.image.map((item, value) => {
                    return (
                        <Grid key={`postImage-${value}`} item
                              xs={(imageCount === 1 && 12) ||
                              (imageCount >= 2 && imageCount <= 4 && 6) ||
                              (imageCount >= 5 && imageCount <= 9 && 4)
                              }>
                            <img
                                referrer="no-referrer|origin|unsafe-url"
                                className={classes.image}
                                style={{
                                    objectFit: 'cover',
                                    height: height
                                }}
                                src={item}
                                alt={''}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
