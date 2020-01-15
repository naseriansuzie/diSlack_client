import React from "react";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import Side from "./sider/Sider";
// import MessageList from "./display/MessageList";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [{ id: 1, name: "general" }],
      currentDisplay: { id: 1, name: "general" },
      msgs: [
        {
          id: 1,
          user_id: 1,
          username: "hello",
          msg: "hello world",
          created_at:
            new Date().getFullYear() +
            "-" +
            new Date().getMonth() +
            1 +
            "-" +
            new Date().getDate() +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes(),
          replies: [{ msg: "ah" }, { msg: "eh" }],
          clicked: true,
        },
        {
          id: 2,
          user_id: 1,
          username: "hello",
          msg: "hello world",
          created_at:
            new Date().getFullYear() +
            "-" +
            new Date().getMonth() +
            1 +
            "-" +
            new Date().getDate() +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes(),
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
    let renewMsgs = this.state.msgs.map(msg => {
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
    const { msgs, clickedMsg } = this.state;
    const { Footer, Content } = Layout;
    const {
      handleClickReply,
      handleClickProfile,
      handleClickReplyClose,
    } = this;
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
          <Col span={3} style={{ height: "100%" }}>
            <Side />
          </Col>
          <Col span={clickedMsg ? 12 : 21} style={{ height: "100%" }}>
            <Layout style={{ height: "100%" }}>
              <Content>
                {msgs ? (
                  <div>messages</div>
                ) : (
                  // <MessageList
                  //   msgs={msgs}
                  //   handleClickReply={handleClickReply}
                  //   handleClickProfile={handleClickProfile}
                  // />
                  <div>아직 메시지가 없습니다.</div>
                )}
              </Content>
              <Footer>Foot</Footer>
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
                {clickedMsg
                  ? clickedMsg[0].msg //메시지 엔트리스 컴포넌트 붙이기
                  : ""}
              </Row>
              <div>{}replies</div>
              <Row>
                {clickedMsg
                  ? clickedMsg[0].replies[0].msg //메시지 리스트 컴포넌트 붙이기
                  : ""}
              </Row>
            </Col>
          ) : (
            <div></div>
          )}
        </Row>
      </div>
    );
  }
}

export default MainPage;
