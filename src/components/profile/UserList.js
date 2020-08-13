import React, {Component} from 'react';
import {List} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import {getFans, getFollows} from "../../service/UserService";
import UserItem from "./UserItem";

const styles = ((theme) => ({
    userContainer: {
        width: '100%',
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column',
        overflow: 'auto'
    },
    // list:{
    //     width:'100%'
    // },
}));

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export const UserListType = {
    FAN: 0,
    FOLLOW: 1
};

export const UserListBelong = {
    OTHERS: 0,
    PERSONAL: 1
};

@withStyles(styles)
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            users:[],
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
        const param = this.props.location.search.split('&');
        const user_id = param[0].substr(4);
        const params = {
            pageNum: this.state.nextHref,
            pageSize: this.state.pageSize,
            user_id: user_id
        };
        const callback = (data) => {
            this.setState({
                users: [...this.state.users, ...data.data.list],
                hasMoreItems: (data.data.totalPage > this.state.nextHref),
                nextHref: this.state.nextHref + 1
            })
        };
        if (this.props.type === UserListType.FAN)
            getFans(params, callback);
        else getFollows(params, callback);
    }

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            users: [],
            hasMoreItems: true,
            nextHref: 0,
            key: this.state.key + 1
        })
    }

    render() {
        const {classes} = this.props;
        const param = this.props.location.search.split('&');
        const profile_user_id = param[0].substr(4);
        return (
            <div className={classes.userContainer}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    key={this.state.key}>
                    <List >
                        {this.state.users.map((item, index) => {
                            return (
                                <UserItem key={index} user={item} type={
                                    profile_user_id===this.props.user.user_id.toString()?
                                        UserListBelong.PERSONAL
                                        :UserListBelong.OTHERS
                                }/>
                                )
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
