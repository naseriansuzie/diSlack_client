import React from "react";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import Side from "./sider/Sider";
import MessageList from "./display/MessageList";

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
          replies: [],
          clicked: false,
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
    };
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
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

  render() {
    console.log(this.state);
    const { msgs } = this.state;
    const { Footer, Content } = Layout;
    const { handleClickReply, handleClickProfile } = this;
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
              <Footer>Foot</Footer>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
