import React, {Component} from 'react';
import SideBar from "../components/basic/SideBar";
import { Row, Col } from 'antd';
import NewsCarousel from "../components/NewsCarousel";
import {Layout} from "antd";
const {Sider,Content}=Layout;
class HomePreLoginView extends Component{

    render() {
        return (
            <div className="home-content">
                <Layout>
                    <Sider><SideBar/></Sider>
                    <Content style={{backgroundColor:"#FF5722"}}>
                        <div>
                            <Row span={6}>
                                <Col span={6}><NewsCarousel/></Col>
                                <Col span={6}>col-8</Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default HomePreLoginView;
