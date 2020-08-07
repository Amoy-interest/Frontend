import React from "react";
import IconButton from "@material-ui/core/IconButton";
import RedditIcon from "@material-ui/icons/Reddit";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginLeft:theme.spacing(18),
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

export default function Header(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
            >
                <RedditIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
                {props.title}
            </Typography>
        </React.Fragment>
    );
}
