import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from "@material-ui/core/styles/withStyles";
// import {Divider} from "@material-ui/core";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
        //marginTop:theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        //position:'fixed'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fontSize:'36px',
        fullWidth:true
    },
}));

@withStyles(styles)
class SideBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            value:0
        }
    }

    handleChange = (event, newValue) => {
        this.setState({value:newValue});
    };

    render() {
        const {classes}=this.props;
        const {value}=this.state;
        return (
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="热门" />
                    <Tab label="社会" />
                    <Tab label="明星" />
                    <Tab label="搞笑" />
                    <Tab label="读书" />
                    <Tab label="摄影"  />
                    <Tab label="体育" />
                    <Tab label="动漫" />
                </Tabs>
            </div>
        );
    }
}

export default SideBar;
