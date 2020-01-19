import React from "react";
import { Layout, Row, Col } from "antd";
import Nav from "./display/nav";
import InputMsg from "./display/inputMsg";
import "antd/dist/antd.css";
import Side from "./sider/Sider";
import MessageList from "./display/MessageList";
import axios from "axios";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      dms: [],
      currentDisplay: null,
      //[{user_id, username, createdAt, message, reply}]
      msgs: [{id:1, user_id : 1, username: 'test1', createdAt:"2020-01-17 06:58:47", message:"안녕하세요",clicked:false ,reply:[{id:1,user_id : 2, username: 'test2', createdAt:"2020-01-17 07:13:00", message:"반가워요"},{id:2,user_id : 1, username: 'test1', createdAt:"2020-01-17 06:58:47", message:"HELLO:)"}]}],
      clickedMsg: [],
    };
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleClickReplyClose = this.handleClickReplyClose.bind(this);
  }

  // Methods
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
    this.setState({ clickedMsg: [], msgs: renewMsgs });
  }


  // LifeCycle
  async componentDidMount() {
    // 워크스페이스 아이디로 채널이랑 (디엠)을 다 불러온다 -> SETSTATE를 해주면 된다. + currentDisplay에 채널의 0번째 껄 셋스테이트한다.
    await axios.get(`${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channel/list`,{
      withCredentials: true, // 쿠키전달
    })
    .then(res => {
      this.setState({channels: res.data , currentDisplay:res.data[0]})
    })

    await axios.get(`${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/${this.state.currentDisplay.id}/list`,{
      withCredentials: true, // 쿠키전달
    })
    .then(res => {
      console.log("채널에 메시지 겟요청",res)
      if( res.data.length !== 0) {
        this.setState({msgs: res.data})
      } else {
        console.log("메세지가 비어있습니다.")
      }
    })

  
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
    const { msgs, dms, channels, currentDisplay, clickedMsg } = this.state;
    const { Footer, Content } = Layout;
    const {
      handleClickReply,
      handleClickProfile,
      handleClickReplyClose,
    } = this;
    const noReplyClickedMsg = [];
    for (const msg of clickedMsg) {
      const obj = {};
      for (const key in msg) {
        obj[key] = msg[key];
      }
      noReplyClickedMsg.push(obj);
    }
    noReplyClickedMsg.map(msg => {
      delete msg.replies;
      return msg;
    });
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
                  <InputMsg props={this.props} currentDisplay={this.state.currentDisplay}/>
                </Footer>
              </Layout>
            </Col>
            {clickedMsg.length ? (
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
                <Row style={{ padding: "10px" }}>
                  {clickedMsg.length ? (
                    <MessageList
                      msgs={noReplyClickedMsg}
                      handleClickReply={handleClickReply}
                      handleClickProfile={handleClickProfile}
                    />
                  ) : (
                    ""
                  )}
                </Row>
                <Row style={{ padding: "10px" }}>
                  Reply : {clickedMsg[0].reply.length}
                </Row>
                <Row style={{ padding: "10px" }}>
                  {clickedMsg.length ? (
                    <MessageList
                      msgs={clickedMsg[0].reply}
                      handleClickReply={handleClickReply}
                      handleClickProfile={handleClickProfile}
                    />
                  ) : (
                    ""
                  )}
                </Row>
                <Row>
                  <InputMsg props={this.props} />
                </Row>
              </Col>
            ) : (
              <div />
            )}
          </Row>
        </div>
      ) : (
        <div>Loading...</div>
      )
    );
  }
}

export default MainPage;
