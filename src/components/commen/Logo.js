import React from "react";
import Icon from "@material-ui/core/Icon";
import RedditIcon from "@material-ui/icons/Reddit";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginLeft:theme.spacing(2),
        marginRight:theme.spacing(2)
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
            <Icon
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
            >
                <RedditIcon/>
            </Icon>
            <Typography className={classes.title} variant="h6" noWrap>
                <Box fontWeight="fontWeightBold"
                     //fontFamily="Monospace"
                     m={1}>
                {props.title}
                </Box>
            </Typography>
        </React.Fragment>
    );
}
