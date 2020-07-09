import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //marginTop:theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fontSize:'24px'
    },
}));

export default function SideBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Divider/>
                <Tab label="热门" />
                <Divider/>
                <Tab label="社会" />
                <Divider/>
                <Tab label="明星" />
                <Divider/>
                <Tab label="搞笑" />
                <Divider/>
                <Tab label="电影" />
                <Divider/>
                <Tab label="读书" />
                <Divider/>
                <Tab label="摄影"  />
                <Divider/>
                <Tab label="体育" />
                <Divider/>
                <Tab label="动漫" />
                <Divider/>
            </Tabs>
        </div>
    );
}


