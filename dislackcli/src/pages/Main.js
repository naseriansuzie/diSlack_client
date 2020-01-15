import React from "react";
// import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import Side from "./sider/Sider";
import Nav from "./display/nav";
import InputMsg from "./display/inputMsg";
import "antd/dist/antd.css";

const { Header, Footer, Sider, Content } = Layout;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("APP->MAIN : ", props);
    this.state = {
      channels: [{ id: 1, name: "general" }],
      currentDisplay: { id: 1, name: "general" },
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

  // 채널을 클릭했을 때, currentDisplay가 바뀌고, msgs도 그에 따라 변경되어야 한다.

  render() {
    const { msgs, channels, currentDisplay } = this.state;
    console.log("MSG입력? ", this.state.msgs);
    return (
      // sticky사용을 위해 div수정 필요
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
            <Nav msgs={msgs} props={this.props} />
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
                <InputMsg />
              </Footer>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
