import React, {Component} from 'react';
import {Layout} from "antd";
import PrimarySearchAppBar from "../components/basic/Header";
const { Header, Content, Footer } = Layout;
class HomePreLoginView extends Component{

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <PrimarySearchAppBar/>
                </Header>
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <div className={"foot-wrapper"}>
                                HomePreLogin page!
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default HomePreLoginView;
