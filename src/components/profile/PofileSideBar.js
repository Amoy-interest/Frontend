import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import PostCardList from "../../components/post/PostCardList";
import ProfileCard from "../../components/profile/ProfileCard";
import {PostType} from "../../utils/constants";
import UserList, {UserListType} from "./UserList";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fontSize:'36px',
        fullWidth:true
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{marginLeft:'18px'}}>{children}</div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

@withStyles(styles)
class SideBarForProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value:0
        };
    }

    handleChange = (event, newValue) => {
        this.setState({value:newValue})
    };

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({value:0})
    }

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
                    <Tab label="个人资料" {...a11yProps(0)} />
                    <Tab label="粉丝列表" {...a11yProps(1)} />
                    <Tab label="关注列表" {...a11yProps(2)} />
                    {/*<Tab label="设置" {...a11yProps(3)} />*/}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ProfileCard {...this.props}/>
                    <PostCardList index={PostType.OWN} {...this.props}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserList type={UserListType.FAN} {...this.props}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <UserList type={UserListType.FOLLOW}{...this.props}/>
                </TabPanel>
            </div>
        );
    }
}
export default SideBarForProfile
