import React from "react";
import socketio from "socket.io-client";
import { Row, Col } from "antd";
import ThreadInputMsg from "./ThreadInputMsg";
import MessageList from "./MessageList";
import "./ThreadCommon.css";
import "./Thread.css";

class Thread extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.type = this.props.currentDisplay.name;
    this.socket = socketio.connect(
      `${process.env.REACT_APP_DEV_URL}/channelThread`,
      {
        path: "/socket.io",
        transports: ["websocket"],
      },
    );
    this.socket.on("connect", data => {
      this.socket.emit(
        `${this.type ? "joinChannelThread" : "joinDirectThread"}`,
        this.props.clickedMsg[0].id,
      );
    });
    this.socket.on("message", data => {
      this.props.handleReply(JSON.parse(data));
    });
    this.scroll.scrollTop = this.scroll.scrollHeight - this.scroll.clientHeight;
  }

  componentDidUpdate() {
    this.scroll.scrollTop = this.scroll.scrollHeight - this.scroll.clientHeight;
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    const {
      currentDisplay,
      clickedMsg,
      replies,
      makeNoReplyMessage,
      handleClickReply,
      handleReplyClose,
      handleClickProfile,
    } = this.props;
    if (clickedMsg.length) {
      return (
        <div
          className="Thread-container Thread-scroll"
          ref={ref => (this.scroll = ref)}
        >
          <Col className="Thread-container">
            <Row className="Thread-pad Thread-back-color">
              <Col span={20}>
                <Row className="Thread-header Thread-title Thread-title-pad ">
                  <div className="Thread-header-col">Thread</div>
                  <div className="Thread-font-col">#{currentDisplay.name}</div>
                </Row>
              </Col>
              <Col span={4} className="Thread-center">
                <a
                  className="Thread-header-col Thread-X Thread-font-col"
                  onClick={handleReplyClose}
                >
                  X
                </a>
              </Col>
            </Row>
            <Row className="Thread-sm-pad">
              {clickedMsg.length ? (
                <MessageList
                  thread
                  msgs={makeNoReplyMessage(clickedMsg[0])}
                  handleClickReply={handleClickReply}
                  handleClickProfile={handleClickProfile}
                />
              ) : (
                <div />
              )}
            </Row>

            <Row className="Thread-sm-pad">
              {clickedMsg[0].replyCount || replies.length > 0 ? (
                <div className="Thread-hr">
                  <span>{replies.length}개의 댓글</span>
                </div>
              ) : (
                <div />
              )}
            </Row>

            <Row className="Thread-sm-pad">
              {clickedMsg.length ? (
                <MessageList
                  msgs={replies}
                  handleClickReply={handleClickReply}
                  handleClickProfile={handleClickProfile}
                />
              ) : (
                <div />
              )}
            </Row>
            <Row>
              <ThreadInputMsg
                props={this.props}
                currentDisplay={currentDisplay}
              />
            </Row>
          </Col>
        </div>
      );
    }
    return <div />;
  }
}

export default Thread;
