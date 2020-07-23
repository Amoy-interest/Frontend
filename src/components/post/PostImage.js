import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    }
}));
export default function PostImage(props) {
    const classes = useStyles();
    if (props.image !== null) {
        const imageCount = props.image.length;
        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    {props.image.map((item, value) => {
                        return (
                            <Grid key={`postImage-${value}`} item xs={
                                (imageCount === 1 && 12) || (imageCount >= 2 && imageCount <= 4 && 6) ||
                                (imageCount >= 5 && imageCount <= 9 && 4)
                            }>
                                <img className={classes.image} src={item} alt={''}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    } else return null;
}
