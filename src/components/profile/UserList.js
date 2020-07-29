import React, {Component} from 'react';
import {List} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import {getFans, getFollows} from "../../service/UserService";
import UserItem from "./UserItem";

const styles = ((theme) => ({
    item: {
        width: '100%'
    },
    userContainer: {
        width: '100%',
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column',
        overflow: 'auto'
    },
    list:{
        width:'100%'
    },
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

export const UserListType = {
    FAN: 0,
    FOLLOW: 1
};

@withStyles(styles)
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            hasMoreItems: true,
            nextHref: 0,
            pageSize: 2,
            key: props.key ? props.key : 0
        };
        this.loadMore = this.loadMore.bind(this);
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };

    loadMore() {
        const params = {
            pageNum: this.state.nextHref,
            pageSize: this.state.pageSize,
        };
        const callback = (data) => {
            this.setState({
                users: [...this.state.users, ...data.data.list],
                hasMoreItems: (data.data.totalPage > this.state.nextHref),
                nextHref: this.state.nextHref + 1
            })
        };
        if (this.props.type === UserListType.FAN)
            getFans(params,callback);
        else getFollows(params, callback);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.userContainer}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    key={this.state.key}>
                    <List className={classes.list}>
                        {this.state.users.map((item, index) => {
                            return (
                                <UserItem index={index} user={item}/>
                            );
                        })}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, null
)(UserList);