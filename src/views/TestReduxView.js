import React, {Component} from 'react';
import {setToken, setUser} from "../redux/actions";
import { connect } from 'react-redux'
import * as userService from "../service/UserService";
// import InfiniteScroll from 'react-infinite-scroller';
// import Typography from "@material-ui/core/Typography";

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
            };
            dispatch(setUser(user));
            dispatch(setToken('zyw token'));
        }
    }
}

function sleep(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
    })
}

class TestReduxView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextHref: 1,
            pageSize: 6
        };

        this.handleGetStore = this.handleGetStore.bind(this);
        this.handleGetProps = this.handleGetProps.bind(this);
        this.handleDispatch = this.handleDispatch.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    handleGetStore(){
        console.log(this.props);
    }

    handleGetProps(){
        console.log(this.props.history);
        this.props.history.push({ pathname: '/test-ali', state: { data: 'test' } });
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

    asyncFunction = async () => {
        let promise = new Promise(function(resolve, reject){
            console.log("AAA");
            sleep(1000);
            resolve("1234")
        });
        let value = await promise;
        console.log(value);
        console.log("CCC");
    };

    render() {
        // const classes = this.props.classes;
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                TestView page!
                <button onClick={this.asyncFunction}>asyncFunction</button>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={this.loadMore}>loadMore</button>
                    <button onClick={this.handleGetStore}>GetStore</button>
                    <button onClick={this.handleGetProps}>GetHistory</button>
                    <button onClick={this.handleDispatch}>Dispatch</button>
                </div>
                <div style={{height: 600, overflow:'auto'}}>
                    {/*<InfiniteScroll*/}
                    {/*    pageStart={0}*/}
                    {/*    loadMore={this.loadMore}*/}
                    {/*    hasMore={this.state.hasMoreItems}*/}
                    {/*    loader={<div className="loader" key={0}>Loading ...</div>}*/}
                    {/*    useWindow={false}*/}
                    {/*>*/}
                    {/*    <div className="tracks">*/}
                    {/*        {this.state.tracks.map((track, i) => {*/}
                    {/*        return (*/}
                    {/*        <div className="track" key={i}>*/}
                    {/*        <Typography variant="body2" color="textSecondary" component="p" align='center'>*/}
                    {/*        {track.title} number {i}*/}
                    {/*        </Typography>*/}
                    {/*        </div>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*    </div>*/}
                    {/*</InfiniteScroll>*/}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestReduxView)
