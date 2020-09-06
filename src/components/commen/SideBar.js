import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PubSub from "pubsub-js";
import {UserType, MsgType, MessageType} from "../../utils/constants";
import {makeStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import {useHistory} from "react-router";

const classes = makeStyles((theme) => ({
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

const content = ["热门", "校园", "明星", "宠物", "读书", "摄影", "体育", "动漫"];

function mapStateToProps(state) {
    return {
        role: state.userReducer.role,
    }
}

function SideBar (props){

    const [value, setValue] = useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        goto(newValue);
    };

    const goto = (value) => {
        if (props.role === UserType.VISITOR) {
            PubSub.publish(MsgType.SET_MESSAGE, {text: "请先登陆", type: MessageType.WARNING});
        }
        else {
            history.push({pathname: '/group', state: {group_name: content[value], index: value}});
        }
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                //variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {
                    content.map((item) => {
                        return (
                            <Tab className={classes.tab} label={item}/>
                        )
                    })
                }
            </Tabs>
        </div>
        );
}

export default connect(
    mapStateToProps,
    null
)(SideBar)
