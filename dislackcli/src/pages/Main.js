import React from "react";
import { Layout, Row, Col } from "antd";
import Side from "./sider/Sider";
import Nav from "./display/nav";
import MessageList from "./display/MessageList";
import InputMsg from "./display/inputMsg";
import Thread from "./display/Thread";
import "antd/dist/antd.css";
import axios from "axios";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      dms: [],
      currentDisplay: null,
      //msgs의 res 형식: [{id, user_id, username, createdAt, message, clicked, reply}]
      msgs: [
        {
          id: 1,
          user_id: 1,
          username: "test1",
          createdAt: "2020-01-17 06:58:47",
          message: "안녕하세요",
          clicked: false,
          reply: [
            {
              id: 1,
              user_id: 2,
              username: "test2",
              createdAt: "2020-01-17 07:13:00",
              message: "반가워요",
            },
            {
              id: 2,
              user_id: 1,
              username: "test1",
              createdAt: "2020-01-17 06:58:47",
              message: "HELLO:)",
            },
          ],
        },
      ],
      clickedMsg: [],
    };
    this.makeNoReplyMessage = this.makeNoReplyMessage.bind(this);
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleClickReplyClose = this.handleClickReplyClose.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleClickMemberList = this.handleClickMemberList.bind(this);
  }

  // Methods
  makeNoReplyMessage(messageObj) {
    const newMessageArr = [];
    const obj = {};
    for (const key in messageObj) {
      obj[key] = messageObj[key];
    }
    newMessageArr.push(obj);
    newMessageArr.map(message => {
      delete message.reply;
      return message;
    });
    return newMessageArr;
  }

  handleClickReply(msgId) {
    this.setState({
      msgs: this.state.msgs.map(msg => {
        if (msg.id === msgId) {
          msg.clicked = true;
        }
        return msg;
      }),
    });
  }

  handleClickReplyClose() {
    const renewMsgs = this.state.msgs.map(msg => {
      if (msg.clicked) {
        msg.clicked = false;
      }
      return msg;
    });
    this.setState({ clickedMsg: [], msgs: renewMsgs });
  }

  handleClickProfile(userId) {
    console.log(userId);
    // Profile style을 none에서 취소하고,
    // 클릭한 userId 정보를 Profile에 props로 내려줘야 함
  }

  handleClickMemberList() {
    //멤버리스트 스테이트 업데이트
  }

  // LifeCycle
  async componentDidMount() {
    // 워크스페이스 아이디로 채널이랑 (디엠)을 다 불러온다 -> SETSTATE를 해주면 된다. + currentDisplay에 채널의 0번째 껄 셋스테이트한다.
    await axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channel/list`,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        this.setState({ channels: res.data, currentDisplay: res.data[0] });
      });

    await axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/${this.state.currentDisplay.id}/list`,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        console.log("채널에 메시지 겟요청", res);
        if (res.data.length !== 0) {
          this.setState({ msgs: res.data });
        } else {
          console.log("메세지가 비어있습니다.");
        }
      });
  }

  componentDidUpdate() {
    console.log("update");
    const clicked = this.state.msgs.filter(msg => msg.clicked);
    if (clicked.length && this.state.clickedMsg[0] !== clicked[0]) {
      this.setState({
        clickedMsg: clicked,
      });
    }
  }

  render() {
    // console.log(this.state);
    console.log("로그인상태? : ", this.props.isLogin);
    const { currentWorkspace } = this.props;
    const { msgs, dms, channels, currentDisplay, clickedMsg } = this.state;
    const { Footer, Content } = Layout;
    const {
      handleClickReply,
      handleClickProfile,
      makeNoReplyMessage,
      handleClickReplyClose,
      handleClickMemberList,
    } = this;

    return (
      // 로그인 뿐만 채널 or 디엠 null
      this.props.isLogin &&
        (this.state.channels.length || this.state.dms.length) ? (
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
            <Col span={clickedMsg.length ? 12 : 21} style={{ height: "100%" }}>
              <Layout style={{ height: "100%" }}>
                <Content>
                  {msgs.length ? (
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
                  <InputMsg
                    props={this.props}
                    currentDisplay={this.state.currentDisplay}
                  />
                </Footer>
              </Layout>
            </Col>
            <Col>
              <div>
                <Thread
                  style={clickedMsg.length ? { display: "none" } : ""}
                  currentWorkspace={currentWorkspace}
                  currentDisplay={currentDisplay}
                  clickedMsg={clickedMsg}
                  makeNoReplyMessage={makeNoReplyMessage}
                  handleClickReply={handleClickReply}
                  handleClickReplyClose={handleClickReplyClose}
                  handleClickProfile={handleClickProfile}
                  handleClickMemberList={handleClickMemberList}
                />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        // loading state
        <div>Loading...</div>
      )
    );
  }
}

export default MainPage;
