import React from "react";
// import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import Side from "./sider/Sider";
import Nav from "./display/head";
import Foot from "./display/footer";
import "antd/dist/antd.css";

const { Header, Footer, Sider, Content } = Layout;

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      channels: [1],
      currentDisplay: 1,
      msgs: [
        {
          user_id: 1,
          username: "hello",
          msg: "hello world",
          created_at: `${new Date().getFullYear()}-${new Date().getMonth()}${1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          replies: [],
          clicked: false,
        },
        {
          user_id: 2,
          username: "welcome",
          msg: "diSlack is good :)",
          created_at: `${new Date().getFullYear()}-${new Date().getMonth()}${1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          replies: [],
          clicked: false,
        },
      ],
    };
  }

  render() {
    const { msgs } = this.state.msgs;
    return (
      <div>
        <Row
          style={{
            width: "1600px",
            height: "70px",
            position: "sticky",
            top: 0,
            zIndex: 3,
          }}
        >
          <Col
            span={4}
            style={{
              height: "100%",
              backgroundColor: "#38ada9",
              // borderStyle: "solid",
              // borderWidth: "0.5px",
            }}
          >
            Side_Header
          </Col>
          <Col
            span={20}
            style={{
              height: "100%",
              backgroundColor: "#ecf0f1",
              borderColor: "#bdc3c7",
              borderStyle: "solid",
              borderWidth: "0.5px",
            }}
          >
            <Nav username={msgs} style={{}} />
          </Col>
        </Row>
        <Row style={{ width: "1600px", height: "744px" }}>
          <Col span={4} style={{ height: "100%" }}>
            <Side />
          </Col>
          <Col span={20} style={{ height: "100%" }}>
            <Layout style={{ height: "100%" }}>
              <Content>Con</Content>
              <Footer
                style={{
                  backgroundColor: "#ecf0f1",
                  position: "sticky",
                  bottom: 0,
                  width: "100%",
                  padding: 0,
                }}
              >
                <Foot />
              </Footer>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
