import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:theme.spacing(2),
        //backgroundColor: theme.palette.background.paper,
        //display: 'flex',
        //position:'fixed'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fullWidth:true
    },
    tab:{
        fontSize:'17px',
    }
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
                    //variant="scrollable"
                    value={value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab className={classes.tab} label="热门" />
                    <Tab className={classes.tab} label="社会" />
                    <Tab className={classes.tab} label="明星" />
                    <Tab className={classes.tab} label="搞笑" />
                    <Tab className={classes.tab} label="读书" />
                    <Tab className={classes.tab} label="摄影"  />
                    <Tab className={classes.tab} label="体育" />
                    <Tab className={classes.tab}label="动漫" />
                </Tabs>
            </div>
        );
    }
}

export default SideBar;
