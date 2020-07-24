import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        position:'fixed'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fontSize:'36px',
        fullWidth:true
    },
}));

export default function SideBarForProfile() {
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
                <Tab label="个人资料" />
                <Tab label="关注列表" />
                <Tab label="粉丝列表" />
                <Tab label="设置" />
            </Tabs>
        </div>
    );
}
