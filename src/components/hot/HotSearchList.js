import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { FixedSizeList } from 'react-window';
import PropTypes from "prop-types";
import HotSearchItem from "./HotSearchItem";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {getHotList} from "../../service/TopicService";
import Box from "@material-ui/core/Box";
import Background from "../../assets/img/background7.png";
import title from '../../assets/img/title.png';
import {amber} from "@material-ui/core/colors";

const styles =((theme) => ({
    root: {
        marginTop:theme.spacing(2),
        width: '300',
        //position:'fixed',
        color: theme.palette.text.primary,
        rounded:true
    },
    title: {
        marginBottom:10,
        padding:theme.spacing(2),
        //backgroundImage: `url(${Background})`,
        backgroundColor: amber[100],
        opacity:0.80
    },
    image:{
        width: '40%'
    }
}));

@withStyles(styles)
class HotSearchList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hotList: [],
        };
        //console.log("props", props);
        //this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        const callback=(data)=>{
            //console.log("data", data);
            this.setState({hotList: data.data.list});
            //console.log(this.state.hotList);
        };
        getHotList(callback);
    }

    render() {
        const {classes}=this.props;
        const {hotList}=this.state;

        function renderRow(props) {
            const { index, style } = props;

            return (
                <HotSearchItem style={style} index={index} item={hotList[index]}/>
            );
        }

        renderRow.propTypes = {
            index: PropTypes.number.isRequired,
            style: PropTypes.object.isRequired,
        };
        if(hotList.length!==0)
        return (
            <Paper elevation={1}className={classes.root}>
                <div className={classes.title}>
                    {/*<Typography variant="h5">*/}
                    {/*    <Box fontWeight="fontWeightBold" fontFamily="Monospace" m={1}>*/}
                    {/*    热门话题*/}
                    {/*    </Box>*/}
                    {/*</Typography>*/}
                    <img className={classes.image} src={title}/>
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
