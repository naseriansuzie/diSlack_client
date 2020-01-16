import React from "react";
import { Layout, Row, Col } from "antd";

import Nav from "./display/nav";
import InputMsg from "./display/inputMsg";
import "antd/dist/antd.css";
import Side from "./sider/Sider";
import MessageList from "./display/MessageList";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [
        { id: 1, name: "general" },
        { id: 2, name: "project" },
      ],
      dms: [
        { id: 1, name: "16_김동인" },
        { id: 2, name: "16_김수지" },
        { id: 3, name: "16_김희주" },
      ],
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
        {
          user_id: 3,
          username: "welcome2",
          msg: "diSlack is good :) say hello",
          created_at: `${new Date().getFullYear()}-${new Date().getMonth()}${1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          replies: [],
          clicked: false,
        },
      ],
      clickedMsg: null,
    };
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleClickReplyClose = this.handleClickReplyClose.bind(this);
  }

  handleClickReply(msgId) {
    this.setState({
      msgs: this.state.msgs.map(msg => {
        if (msg.id === msgId) {
          msg.clicked = !msg.clicked;
        }
        return msg;
      }),
    });
  }

  handleClickProfile(userId) {
    console.log(userId);
    // Profile style을 none에서 취소하고,
    // 클릭한 userId 정보를 Profile에 props로 내려줘야 함
  }

  handleClickReplyClose() {
    const renewMsgs = this.state.msgs.map(msg => {
      if (msg.clicked) {
        msg.clicked = false;
      }
      return msg;
    });
    this.setState({ clickedMsg: null, msgs: renewMsgs });
  }

  componentDidMount() {
    this.setState({
      clickedMsg: this.state.msgs.filter(msg => msg.clicked),
    });
  }

  render() {
    console.log(this.state);
    const { msgs, dms, channels, currentDisplay, clickedMsg } = this.state;
    const { Footer, Content } = Layout;
    const {
      handleClickReply,
      handleClickProfile,
      handleClickReplyClose,
    } = this;
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
            span={3}
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
            span={21}
            style={{
              height: "100%",
              backgroundColor: "#ecf0f1",
              borderColor: "#bdc3c7",
              borderStyle: "solid",
              borderWidth: "0.5px",
            }}
          >
            <Nav msgs={msgs} props={this.props} channels={channels} />
          </Col>
        </Row>
        <Row style={{ width: "1600px", height: "744px" }}>
          <Col span={3} style={{ height: "100%" }}>
            <Side channels={channels} dms={dms} />
          </Col>
          <Col span={clickedMsg ? 12 : 21} style={{ height: "100%" }}>
            <Layout style={{ height: "100%" }}>
              <Content>
                {msgs ? (
                  <MessageList
                    msgs={msgs}
                    handleClickReply={handleClickReply}
                    handleClickProfile={handleClickProfile}
                  />
                ) : (
                  <div>아직 메시지가 없습니다.</div>
                )}
              </Content>
              <Footer
                style={{
                  backgroundColor: "#ecf0f1",
                  position: "sticky",
                  bottom: 0,
                  width: "100%",
                  padding: 0,
                }}
              >
                <InputMsg props={this.props} />
              </Footer>
            </Layout>
          </Col>
          {clickedMsg ? (
            <Col
              span={9}
              style={{
                backgroundColor: "#eeeeee",
                height: "100%",
                overflow: "scroll",
              }}
            >
              <Row style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                <Col span={12}>
                  <Row
                    style={{
                      height: "70px",
                    }}
                  >
                    <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                      Thread
                    </div>
                    <div>#general</div>
                  </Row>
                </Col>
                <Col
                  style={{
                    padding: "15px 15px 0 0",
                    float: "right",
                    fontSize: "large",
                  }}
                >
                  <a onClick={handleClickReplyClose}>X</a>
                </Col>
              </Row>
              <Row>
                {clickedMsg && clickedMsg.length
                  ? clickedMsg[0].msg // 메시지 엔트리스 컴포넌트 붙이기
                  : ""}
              </Row>
              <div>{}replies</div>
              <Row>
                {clickedMsg && clickedMsg.length
                  ? clickedMsg[0].replies[0].msg // 메시지 리스트 컴포넌트 붙이기
                  : ""}
              </Row>
            </Col>
          ) : (
            <div />
          )}
        </Row>
      </div>
    );
  }
}

export default MainPage;
