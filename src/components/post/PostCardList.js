import React, {Component} from 'react';
import PostCard from "./PostCard";
import {getFollowPosts, getOwnPosts, getRandomPosts, getRecommendPosts} from "../../service/PostService";
import {List,ListItem} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";

const styles = ((theme) => ({
    root: {
        width: '100%',
        //marginLeft: "1.5px",
        marginTop: theme.spacing(2)
    },
    item: {
        width:'100%'
    }
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

@withStyles(styles)
class PostCardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({posts: data.data});
            console.log(this.state.posts);
        };
        switch (this.props.index) {
            case 0:
            default:
                getRandomPosts(callback);
                break;
            case 1:
                getRecommendPosts(callback);
                break;
            case 2:
                getFollowPosts(callback);
                break;
            case 3:
                getOwnPosts(callback);
                break;
        }
    }


    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        if (!this.state.posts) return (<div>Loading</div>);
        else return (
            <div className={this.props.classes.root}>
                <List>
                    {this.state.posts.map((item, value) => {
                        const nickname = item.nickname;
                        console.log(nickname);
                        return (
                            <ListItem className={this.props.classes.item} key={value}>
                                {(this.props.user.user === null || this.props.user.user.nickname !== nickname) ?
                                    <PostCard post={item} index={0}/> : <PostCard post={item} index={1}/>}
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(PostCardList);



// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         //marginLeft: "1.5px",
//         marginTop: theme.spacing(2)
//     },
//     item: {
//         width:'100%'
//     }
// }));

// export function PostCards(props) {
//     const classes = useStyles();
//     console.log(props.user);
//     return (
//         <div className={classes.root}>
//             <List>
//                 {props.posts.map((item, value) => {
//                     const nickname = item.nickname;
//                     console.log(nickname);
//                     return (
//                         <ListItem className={classes.item} key={value}>
//                             {(props.user.user === null || props.user.user.nickname !== nickname) ?
//                                 <PostCard post={item} index={0}/> : <PostCard post={item} index={1}/>}
//                         </ListItem>
//                     );
//                 })}
//             </List>
//         </div>
//     );
// }
