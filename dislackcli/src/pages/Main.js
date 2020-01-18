import React from "react";
import axios from "axios";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import Side from "./sider/Sider";
import Nav from "./display/nav";
import MessageList from "./display/MessageList";
import InputMsg from "./display/inputMsg";
import Thread from "./display/Thread";
import MemberList from "./display/MemberList";
import UserProfile from "./display/UserProfile";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      dms: [],
      currentDisplay: null, //<- 객체형식으로 나중에 채워짐
      //msgs의 res 형식: [{id, user:{id, name, email}, createdAt, updatedAt, message, clicked, replyCount}]
      msgs: [
        //<- 현재는 mock data, default는 빈 배열 형식
        {
          id: 1,
          message: "안녕하세요",
          createdAt: "2020-01-18T14:09:14.000Z",
          updatedAt: "2020-01-18T14:09:14.000Z",
          user: {
            id: 1,
            name: "test1",
            email: "test1@test.com",
          },
          replyCount: 2,
          clicked: false,
        },
        {
          id: 2,
          message: "Hello",
          createdAt: "2020-01-18T14:09:15.000Z",
          updatedAt: "2020-01-18T14:09:15.000Z",
          user: {
            id: 1,
            name: "test2",
            email: "test2@test.com",
          },
          replyCount: 0,
          clicked: false,
        },
      ],
      clickedMsg: [],
      replies: [], //객체 형태 {id, reply, createdAt, user:{id, name, email}}
      memberList: [
        //<- 현재는 mock data, default는 빈 배열 형식
        { id: 1, name: "test1", email: "test1@test.com" },
        { id: 2, name: "test2", email: "test2@test.com" },
      ],
      filteredMembers: null,
      clickedUser: null,
    };
    this.makeNoReplyMessage = this.makeNoReplyMessage.bind(this);
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleReplyClose = this.handleReplyClose.bind(this);
    this.handleClickMemberList = this.handleClickMemberList.bind(this);
    this.handleMemberListClose = this.handleMemberListClose.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleProfileClose = this.handleProfileClose.bind(this);
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
      delete message.replyCount;
      return message;
    });
    return newMessageArr;
  }

  handleClickReply(msgId) {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channelmessage/${currentDisplay.id}/${msgId}`,
        {
          withCredentials: true,
        },
      )
      .then(res =>
        this.setState({
          msgs: this.state.msgs.map(msg => {
            if (msg.id === msgId) {
              msg.clicked = true;
            }
            return msg;
          }),
          replies: res.data,
          filteredMembers: null,
          clickedUser: null,
        }),
      );
  }

  handleReplyClose() {
    const renewMsgs = this.state.msgs.map(msg => {
      if (msg.clicked) {
        msg.clicked = false;
      }
      return msg;
    });
    this.setState({ msgs: renewMsgs, clickedMsg: [], replies: [] });
  }

  handleClickMemberList() {
    let currentId = this.state.currentDisplay.id;
    let filteredMembers = this.state.memberList.filter(
      member => member.id === currentId,
    );
    console.log("필터된 멤버들 =", filteredMembers);
    this.setState({
      filteredMembers: filteredMembers,
      clickedMsg: [],
      clickedUser: null,
    });
  }

  handleMemberListClose() {
    this.setState({ filteredMembers: null });
  }

  handleClickProfile(userId) {
    console.log("유저 프로필 클릭함", userId);
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/user/profile/${userId}`,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res =>
        this.setState({
          clickedUser: res.data,
          clickedMsg: [],
          filteredMembers: null,
        }),
      );
  }

  handleProfileClose() {
    this.setState({ clickedUser: null });
  }

  // LifeCycle
  async componentDidMount() {
    // 워크스페이스 아이디로 채널이랑 (디엠)을 다 불러온다 -> SETSTATE를 해주면 된다. + currentDisplay에 채널의 0번째 껄 셋스테이트한다.
    // try {
    try {
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
      /* api 새로 나오면 적용
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
        })
        */

      await axios
        .get(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/user/list`,
          {
            withCredentials: true, // 쿠키전달
          },
        )
        .then(res => {
          console.log("참여 중인 유저들 =", res.data);
          this.setState({ memberList: res.data });
        });
    } catch (err) {
      console.log(err);
    }
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
    console.log("로그인상태? : ", this.props.isLogin);
    const { currentWorkspace } = this.props;
    const {
      channels,
      dms,
      currentDisplay,
      msgs,
      clickedMsg,
      replies,
      filteredMembers,
      clickedUser,
    } = this.state;
    const { Footer, Content } = Layout;
    const {
      makeNoReplyMessage,
      handleClickReply,
      handleReplyClose,
      handleClickMemberList,
      handleMemberListClose,
      handleClickProfile,
      handleProfileClose,
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
              <Nav
                msgs={msgs}
                props={this.props}
                channels={channels}
                handleClickMemberList={handleClickMemberList}
              />
            </Col>
          </Row>
          <Row style={{ width: "1600px", height: "744px" }}>
            <Col span={3} style={{ height: "100%" }}>
              <Side channels={channels} dms={dms} />
            </Col>
            <Col
              span={
                clickedMsg.length || filteredMembers || clickedUser ? 15 : 21
              }
              style={{ height: "100%" }}
            >
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
            <Col span={6} style={{ height: "100%" }}>
              {clickedMsg.length ? (
                <Thread
                  currentWorkspace={currentWorkspace}
                  currentDisplay={currentDisplay}
                  clickedMsg={clickedMsg}
                  replies={replies}
                  makeNoReplyMessage={makeNoReplyMessage}
                  handleClickReply={handleClickReply}
                  handleReplyClose={handleReplyClose}
                  handleClickProfile={handleClickProfile}
                  handleClickMemberList={handleClickMemberList}
                />
              ) : filteredMembers ? (
                <MemberList
                  filteredMembers={filteredMembers}
                  handleClickProfile={handleClickProfile}
                  handleMemberListClose={handleMemberListClose}
                />
              ) : clickedUser ? (
                <UserProfile
                  clickedUser={clickedUser}
                  handleProfileClose={handleProfileClose}
                  // dm 생성 함수 부분도 나중에 props로 내리기
                />
              ) : (
                <Row></Row>
              )}
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
