import React, {Component} from 'react';
import {login} from "../service/userService";

class TestView extends Component{

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

    render() {
        return (
            <div>
                TestView page!
                <button onClick={this.handleLogin}>login</button>
                <button onClick={this.handleLogin_wrong}>login wrong</button>
            </div>
        );
    }
}

export default TestView;
