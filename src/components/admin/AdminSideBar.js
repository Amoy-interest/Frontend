import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ViewListIcon from '@material-ui/icons/ViewList';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        fontSize:'36px',
        fullWidth:true
    },
}));

export default function AdminSideBar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.index);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const openUsersManageView=()=>{
        history.replace('/users-manage');
    };
    const openPostsManageView=()=>{
        history.replace('/posts-manage');
    };
    const openTopicsManageView=()=>{
        history.replace('/topics-manage');
    };
    const openSensWordsManageView=()=>{
        history.replace('/sensWords-manage');
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
                <Tab label="用户管理" icon={<PeopleAltIcon/>} onClick={openUsersManageView}/>
                <Tab label="博文管理" icon={<ViewListIcon/>} onClick={openPostsManageView}/>
                <Tab label="话题管理" icon={<WhatshotIcon/>} onClick={openTopicsManageView}/>
                <Tab label="敏感词管理" icon={<AcUnitIcon/>} onClick={openSensWordsManageView}/>
            </Tabs>
        </div>
    );
}
