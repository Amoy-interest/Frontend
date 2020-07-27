import React, {Component} from 'react';
import {setToken, setUser} from "../redux/actions";
import { connect } from 'react-redux'
import * as userService from "../service/UserService"
import InfiniteScroll from 'react-infinite-scroller';
import Typography from "@material-ui/core/Typography";

function mapStateToProps(state) {
    return {
        value: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSetUser: () => {
            let user = {
                name: 'bess',
                userType: 0
            }
            dispatch(setUser(user));
            dispatch(setToken('zyw token'));
        }
    }
}


class TestView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextHref: 1,
            pageSize: 6
        };

        this.handleGetStore = this.handleGetStore.bind(this);
        this.handleDispatch = this.handleDispatch.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    handleGetStore(){
        console.log(this.props.value);
    }

    handleDispatch(){
        this.props.onSetUser();
    }

    loadMore() {
        const callback = (data) => {
            console.log("data", data);
            console.log("state", this.state);
            // alert(JSON.stringify(data, null, 2))
            this.setState({
                tracks: [...this.state.tracks, ...data.data.array],
                hasMoreItems: data.data.hasMoreItems,
                nextHref: data.data.nextHref
            })
        };

        console.log("load more")
        userService.loadMore(this.state.pageSize, this.state.nextHref, callback);
    }

    render() {
        let items = [];
        this.state.tracks.map((track, i) => {
            items.push(
                <div className="track" key={i}>
                    <Typography variant="body2" color="textSecondary" component="p" align='center'>
                        {track.title} number {i}
                    </Typography>
                </div>
            );
        });

        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                TestView page!
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={this.loadMore}>loadMore</button>
                    <button onClick={this.handleGetStore}>GetStore</button>
                    <button onClick={this.handleDispatch}>Dispatch</button>
                </div>
                <div style={{height: 600, overflow:'auto'}}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                        useWindow={false}
                    >
                        <div className="tracks">
                            {items}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestView)
