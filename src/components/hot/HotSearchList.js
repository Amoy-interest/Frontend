import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { FixedSizeList } from 'react-window';
import PropTypes from "prop-types";
import HotSearchItem from "./HotSearchItem";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CommentList, {CommentListType} from "../post/CommentList";
import {getPost} from "../../service/PostService";
import {getHotList} from "../../service/TopicService";
import Box from "@material-ui/core/Box";

const styles =((theme) => ({
    root: {
        width: '300',
        position:'fixed',
        color: theme.palette.text.primary,
    },
    title: {
        marginTop:10
    }
}));

@withStyles(styles)
class HotSearchList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hotList: [],
        };
        console.log("props", props);
        //this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        const callback=(data)=>{
            console.log("data", data);
            this.setState({hotList: data.data.list});
            console.log(this.state.hotList);
        };
        getHotList(callback);
    }

    render() {
        const {classes}=this.props;
        const {hotList}=this.state;

        function renderRow(props) {
            const { index, style } = props;

            return (
                <ListItem button style={style} key={index}>
                    <HotSearchItem index={index} item={hotList[index]}/>
                </ListItem>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };
        if(hotList.length!==0)
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title} variant="h5">
                    <Box fontWeight="fontWeightBold" fontFamily="Monospace" m={1}>
                    热门话题
                    </Box>
                </Typography>
                <FixedSizeList height={360} width={280} itemSize={50} itemCount={hotList.length}>
                    {renderRow}
                </FixedSizeList>
            </Paper>
        );
        else return <div>Loading</div>
    }
}
export default HotSearchList
