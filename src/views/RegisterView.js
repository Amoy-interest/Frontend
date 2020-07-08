import React, {Component} from 'react';
import {Layout} from 'antd';
const { Header, Content, Footer } = Layout;

class RegisterView extends Component{
    render() {
        return (
            <Layout className="layout">
                <Header>
                </Header>
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <div className={"foot-wrapper"}>
                                Register page!
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default RegisterView;
