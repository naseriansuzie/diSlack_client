import React from "react";
// import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import Side from "./sider/Sider";
import "antd/dist/antd.css";

const { Header, Footer, Sider, Content } = Layout;

class MainPage extends React.Component {
  //   constructor() {
  //     super();
  //   }

  render() {
    return (
      <div>
        <Row style={{ width: "1600px", height: "70px" }}>
          <Col span={4} style={{ height: "100%" }}>
            Side_Header
          </Col>
          <Col span={20} style={{ height: "100%" }}>
            Display_Header
          </Col>
        </Row>
        <Row style={{ width: "1600px", height: "744px" }}>
          <Col span={4} style={{ height: "100%" }}>
            <Side />
          </Col>
          <Col span={20} style={{ height: "100%" }}>
            <Layout style={{ height: "100%" }}>
              <Content>Con</Content>
              <Footer>Foot</Footer>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
