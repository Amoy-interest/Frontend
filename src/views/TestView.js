import React, {Component} from 'react';
import {login} from "../service/UserService";
import {setToken, setUser} from "../redux/actions";
import { connect } from 'react-redux'
import {store} from "../redux/configureStore";

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

        this.handleGetStore = this.handleGetStore.bind(this)
        this.handleDispatch = this.handleDispatch.bind(this)
    }

    handleLogin(){
        let data = {
            password: 'zyw',
            username: 'zyw'
        }

        login(data);
    }

    handleLogin_wrong(){
        let data = {
            username: 'zyw'
        }

        login(data);
    }

    handleGetStore(){
        // console.log(store.getState().tokenReducer)
        console.log(this.props.value)
    }

    handleDispatch(){
        this.props.onSetUser()
        store.dispatch(setToken("4839165"))
    }


    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                TestView page!
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={this.handleLogin}>login</button>
                    <button onClick={this.handleLogin_wrong}>login wrong</button>
                    <button onClick={this.handleGetStore}>GetStore</button>
                    <button onClick={this.handleDispatch}>Dispatch</button>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestView)
