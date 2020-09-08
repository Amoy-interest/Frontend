import React from 'react';
import {FixedSizeList} from 'react-window';
import PropTypes from "prop-types";
import HotSearchItem from "./HotSearchItem";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import title from '../../assets/img/title.png';
import {getHotList} from "../../service/TopicService";
import PubSub from "pubsub-js";
import {MessageType, MsgType, ViewType} from "../../utils/constants";

const styles = ((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        width: '300',
        color: theme.palette.text.primary,
        rounded: true
    },
    title: {
        marginBottom: 10,
        padding: theme.spacing(2),
        //backgroundImage: `url(${Background})`,
        backgroundColor: theme.palette.primary.main,
        opacity: 0.80
    },
    image: {
        width: '40%'
    }
}));

@withStyles(styles)
class HotSearchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotList: [],
            hasRequested: false
        };
    }

    componentDidMount() {
        const callback = (data) => {
            console.log("HotSearchList data", data);
            if(data.status !== 200) {
                PubSub.publish(MsgType.SET_MESSAGE, {text: "获取热榜失败！", type: MessageType.ERROR});
                this.setState({hasRequested: true});
                return;
            }
            this.setState({hotList: data.data.list, hasRequested: true});
        };
        getHotList(callback);
    }

    render() {
        const {classes} = this.props;
        const {hotList, hasRequested} = this.state;

        function renderRow(props) {
            const {index, style} = props;

            return (
                <HotSearchItem style={style} index={index} item={hotList[index]}/>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };
        if (hasRequested)
            return (
                <Paper elevation={1} className={classes.root} style={this.props.viewType===ViewType.HOME?{position:'absolute'}:{position:'fixed'}}>
                    <div className={classes.title}>
                        {/*<Typography variant="h5">*/}
                        {/*    <Box fontWeight="fontWeightBold" fontFamily="Monospace" m={1}>*/}
                        {/*    热门话题*/}
                        {/*    </Box>*/}
                        {/*</Typography>*/}
                        <img alt={''} className={classes.image} src={title}/>
                    </div>
                    <FixedSizeList height={360} width={287} itemSize={50} itemCount={hotList.length}>
                        {renderRow}
                    </FixedSizeList>
                </Paper>
            );
        else return <div>Loading</div>
    }
}

export default HotSearchList
