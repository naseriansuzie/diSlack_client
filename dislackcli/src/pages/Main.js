import React from "react";
import axios from "axios";
import { Layout, Row, Col } from "antd";
import Side from "./sider/Sider";
import Nav from "./display/nav";
import MessageList from "./display/MessageList";
import InputMsg from "./display/inputMsg";
import Thread from "./display/Thread";
import MemberList from "./display/MemberList";
import UserProfile from "./display/UserProfile";
import SiderHeader from "./sider/SiderHeader";
import socketio from "socket.io-client";
import "./Main.css";
// import "antd/dist/antd.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      channels: [],
      dms: [],
      currentDisplay: null, // {}
      msgs: [], // [{id, user:{id, name, email}, createdAt, updatedAt, message, clicked, replyCount}]
      clickedMsg: [],
      replies: [], // {id, reply, createdAt, user:{id, name, email}}
      memberList: [], // [{}]
      filteredMembers: null, // [{}]
      clickedUser: null, // {}
      createdReply: false,
    };
    this.makeNoReplyMessage = this.makeNoReplyMessage.bind(this);
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleReplyClose = this.handleReplyClose.bind(this);
    this.handleClickMemberList = this.handleClickMemberList.bind(this);
    this.handleMemberListClose = this.handleMemberListClose.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleProfileClose = this.handleProfileClose.bind(this);
    this.handleCreateReply = this.handleCreateReply.bind(this);
    this.clickedMsgUpdate = this.clickedMsgUpdate.bind(this);
    this.getCN = this.getCN.bind(this);
    this.getDM = this.getDM.bind(this);
    this.setCurrentDisPlay = this.setCurrentDisPlay.bind(this);
    this.setChannelDM = this.setChannelDM.bind(this);
    this.clickedChannel = this.clickedChannel.bind(this);
    this.clickedDM = this.clickedDM.bind(this);
    this.getChannel = this.getChannel.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.profileDM = this.profileDM.bind(this)
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

  clickedMsgUpdate() {
    const clicked = this.state.msgs.filter(msg => msg.clicked);
    if (clicked.length && this.state.clickedMsg[0] !== clicked[0]) {
      this.setState({
        clickedMsg: clicked,
      });
    }
  }

  async clickedChannel(id) {
    console.log("채널이클릭되었습니다 : ", id);
    let allCN = this.state.channels;
    let findCN = allCN.filter(val => {
      if (val.id === id) {
        return val;
      }
    });
    await this.setState({ currentDisplay: findCN[0], msgs: [] });

    // 채널이 바뀌기 때문에 연결한 웹소켓을 해제
    this.socket.disconnect();
    this.socket = socketio.connect(`${process.env.REACT_APP_DEV_URL}/chat`, {
      path: "/socket.io",
      transports: ["websocket"],
    });
    this.socket.on("connect", data => {
      this.socket.emit("joinchannel", this.state.currentDisplay.id);
    });
    this.socket.on("message", data => {
      const message = JSON.parse(data);
      this.setState({ msgs: this.state.msgs.concat(message) });
    });
    await axios
      // create dm api 생성 후 채널인지 dm인지 분기하는 코드 필요
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channelmessage/${this.state.currentDisplay.id}/list`,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        // console.log("채널에 메시지 겟요청", res);
        if (res.data.length !== 0) {
          this.setState({ msgs: res.data });
        } else {
          // console.log("메세지가 비어있습니다.");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert(" 로그인 해주세요");
          window.location = "/signin";
        }
      });
  
  }

  setCurrentDisPlay = e => {
    console.log(e);
  };

  setChannelDM(type, data) {
    console.log("셋체널");
    if (type === "channel") {
      this.setState({ channels: [...this.state.channels, data] });
    } else this.setState({ dms: [...this.state.dms, data] });
  }

  handleClickReply(msgId) {
    this.handleReplyClose();
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channelmessage/${this.state.currentDisplay.id}/${msgId}/list`,
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
      )
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        } else console.log(err);
      });
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
    this.handleReplyClose();
    // 현재는 모든 채널이 public이라서 workspace member === channel member라고 함
    this.setState({
      filteredMembers: this.state.memberList,
      clickedUser: null,
    });
  }

  handleMemberListClose() {
    this.setState({ filteredMembers: null });
  }

  handleClickProfile(userId) {
    this.handleReplyClose();
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
      )
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        }
      });
  }

  handleProfileClose() {
    this.setState({ clickedUser: null });
  }

  handleCreateReply() {
    this.setState({
      createdReply: true,
      clickedUser: null,
      filteredMembers: null,
    });
  }

  // 워크스페이스 아이디로 채널불러오는 api요청
  getCN = () => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channel/list`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        // console.log("채널받아오는 API", res);
        this.setState({ channels: res.data, currentDisplay: res.data[0] });
      })
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        }
      });
  };

  // DM방 불러오기
  getDM = () => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/room/list`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        // console.log("방불러오기", res);
        this.setState({ dms: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // DM방 선택
  async clickedDM(id) {
    console.log("DM이클릭되었습니다 : ", id);
    let allDM = this.state.dms;
    let findDM = allDM.filter(val => {
      if (val.id === id) {
        return val;
      }
    });
    console.log("선택한 DM", findDM);
    await this.setState({ currentDisplay: findDM[0], msgs: [] });
    // DM방 선택 시 대화 불러오기 /:code/directmessage/:id(room)/list
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/directmessage/${id}/list`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log("메시지 겟요청", res);
        if (res.data.length !== 0) {
          this.setState({ msgs: res.data });
        } else {
          // console.log("메세지가 비어있습니다.");
        }
      });
  }

  //채널리스트 불러오기
  getChannel() {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channel/list`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res.data[0]);
        this.setState({ channels: res.data, currentDisplay: res.data[0] });

        this.socket = socketio.connect(`${process.env.REACT_APP_DEV_URL}/chat`);
        this.socket.on("connect", data => {
          this.socket.emit("joinchannel", this.state.currentDisplay.id);
        });
        this.socket.on("message", data => {
          const message = JSON.parse(data);
          this.setState({ msgs: this.state.msgs.concat(message) });
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        }
      });
  }

  //채널 or dm 메시지 불러오기
  getMessage() {
    console.log(this.state.channels);
    const address = this.state.currentDisplay.name
      ? "channelmessage"
      : "directmessage";
    axios
      // create dm api 생성 후 채널인지 dm인지 분기하는 코드 필요
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/${address}/${this.state.currentDisplay.id}/list`,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        // console.log("메시지 겟요청", res);
        if (res.data.length !== 0) {
          console.log("1");
          this.setState({ msgs: res.data });
        } else {
          // console.log("메세지가 비어있습니다.");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        }
      });
  }
  // 멤버리스트 불러오기
  getMembers() {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/user/list`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        // console.log("참여 중인 유저들 =", res.data);
        this.setState({ memberList: res.data });
      })
      .catch(err => console.log(err));
  }

  // RightProfileMessage
  profileDM = () => {
    const user = { friend_id: this.state.clickedUser.id };
    console.log(user)
    console.log(this.props.currentWorkspace)
    axios
        .post(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/room/create`,
          user,
          {
            withCredentials: true,
          },
        )
        .then(res => {
          for (let i = 0; i < this.state.dms.length; i++) {
            if (res.data.id === this.state.dms[i].id) {
              alert("DM창이 이미 존재합니다");
              return;
            }
          }
          this.setChannelDM("DM", res.data);
          alert("DM창이 생성되었습니다.");
          
        })
        .catch(err => {
          console.log("방생성에러", err);
        });
  }

  // LifeCycle
  async componentDidMount() {
    console.log("컴포넌트디드마운트");
    try {
      // // 1. 새로고침시 currentWorkSpace 불러오기
      // let code = this.props.history.location.pathname.split('/main/')[1]
      // let result = this.props.workSpaceList.filter(val => {
      //   return val.code === code
      // })
      // this.props.updateCurrentWorkspace(result)
      await axios
        .get(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channel/list`,
          {
            withCredentials: true,
          },
        )
        .then(res => {
          this.setState({ channels: res.data, currentDisplay: res.data[0] });
          this.socket = socketio.connect(
            `${process.env.REACT_APP_DEV_URL}/chat`,
            {
              path: "/socket.io",
              transports: ["websocket"],
            },
          );
          this.socket.on("connect", data => {
            this.socket.emit("joinchannel", this.state.currentDisplay.id);
          });
          this.socket.on("message", data => {
            const message = JSON.parse(data);
            this.setState({ msgs: this.state.msgs.concat(message) });
          });
        })
        .catch(err => {
          if (err.response && err.response.status === 419) {
            localStorage.setItem("isLogin", null);
            this.setState({ isLogin: false });
            alert("다시 로그인 해주세요");
            window.location = "/signin";
          }
        });
      const address = this.state.currentDisplay.name
        ? "channelmessage"
        : "directmessage";
      await axios
        // create dm api 생성 후 채널인지 dm인지 분기하는 코드 필요
        .get(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/${address}/${this.state.currentDisplay.id}/list`,
          {
            withCredentials: true, // 쿠키전달
          },
        )
        .then(res => {
          // console.log("메시지 겟요청", res);
          if (res.data.length !== 0) {
            this.setState({ msgs: res.data });
          } else {
            // console.log("메세지가 비어있습니다.");
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 419) {
            localStorage.setItem("isLogin", null);
            this.setState({ isLogin: false });
            alert("다시 로그인 해주세요");
            window.location = "/signin";
          }
        });
      // 멤버리스트 받아오는 api 추가
      await axios
        .get(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/user/list`,
          {
            withCredentials: true,
          },
        )
        .then(res => {
          // console.log("참여 중인 유저들 =", res.data);
          this.setState({ memberList: res.data });
        });
      this.getDM();
    } catch (err) {
      console.log("MainCDM_ERR", err);
      if (err.response && err.response.status === 419) {
        localStorage.setItem("isLogin", null);
        this.setState({ isLogin: false });
        alert("다시 로그인 해주세요");
        window.location = "/signin";
      } else console.log(err);
    }
    this.scroll.scrollTop = this.scroll.scrollHeight - this.scroll.clientHeight;

  }

  async componentDidUpdate() {
    console.log("update");
    const clicked = this.state.msgs.filter(msg => msg.clicked);
    if (clicked.length && this.state.clickedMsg[0] !== clicked[0]) {
      this.setState({
        clickedMsg: clicked,
      });
    }

    if (
      this.scroll.scrollHeight -
        this.scroll.clientHeight -
        this.scroll.scrollTop <=
      300
    )
      this.scroll.scrollTop =
        this.scroll.scrollHeight - this.scroll.clientHeight;
  }

  render() {
    const { currentWorkspace, userInfo } = this.props;

    const {
      channels,
      dms,
      currentDisplay,
      msgs,
      clickedMsg,
      replies,
      filteredMembers,
      clickedUser,
      createdReply,
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
      setChannelDM,
      profileDM
    } = this;

    return (
      // 로그인 뿐만 채널 or 디엠 null
      this.props.isLogin &&
        (this.state.channels.length || this.state.dms.length) ? (
        <div className="main-container" style={{ overflow: "hidden" }}>
          <Row className="Main-Side">
            <Col
              span={3}
              style={{
                height: "100%",
                backgroundColor: "#400d3f",
              }}
            >
              <SiderHeader props={this.props} state={this.state} />
            </Col>
            <Col
              span={21}
              style={{
                height: "100%",
                backgroundColor: "white",
                borderColor: "#bdc3c7",
                borderBottom: "solid",
                borderWidth: "0.5px",
                position: "sticky",
                top: 0,
              }}
            >
              <Nav
                currentDisplay={currentDisplay}
                msgs={msgs}
                props={this.props}
                state={this.state}
                channels={channels}
                handleClickMemberList={handleClickMemberList}
              />
            </Col>
          </Row>

          <Row style={{ height: "850px", overflow: "hidden" }}>
            <Col span={3} style={{ height: "100%" }}>
              <Side
                channels={channels}
                dms={dms}
                userInfo={userInfo}
                currentWorkspace={currentWorkspace}
                clickedChannel={this.clickedChannel}
                setChannelDM={setChannelDM}
                clickedDM={this.clickedDM}
              />
            </Col>
            <Col
              span={
                clickedMsg.length || filteredMembers || clickedUser ? 15 : 21
              }
              style={{ height: "100%" }}
            >
              <Layout className="main-layout" style={{ height: "100%" }}>
                <div
                  className="main-layout-content"
                  style={{ overflow: "scroll" ,height:'100%' }}
                  ref={ref => {
                    return (this.scroll = ref);
                  }}
                >
                  {msgs.length ? (
                    <MessageList
                      msgs={msgs}
                      replies={replies}
                      handleClickReply={handleClickReply}
                      handleClickProfile={handleClickProfile}
                    />
                  ) : (
                    <div>아직 메시지가 없습니다.</div>
                  )}
                </div>
                <Footer
                  style={{
                    backgroundColor: "#ecf0f1",
                    position: "sticky",
                    bottom: "20px",
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
              {clickedMsg.length || createdReply ? (
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
                  handleReply={reply => {
                    this.setState({
                      replies: this.state.replies.concat(reply),
                    });
                  }}
                />
              ) : filteredMembers ? (
                <MemberList
                  filteredMembers={filteredMembers}
                  handleClickProfile={handleClickProfile}
                  handleMemberListClose={handleMemberListClose}
                />
              ) : clickedUser ? (
                <UserProfile
                profileDM={profileDM}
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
