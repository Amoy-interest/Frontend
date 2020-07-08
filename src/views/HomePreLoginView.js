import React, {Component} from 'react';
import {Layout} from "antd";
import PrimarySearchAppBar from "../components/basic/Header";
const { Header, Content, Footer } = Layout;
class HomePreLoginView extends Component{

    render() {
        return (
            <div className="home-content">
                <div className={"foot-wrapper"}>
                    HomePreLogin page!
                </div>
            </div>
        );
    }
}

export default HomePreLoginView;
