import React from "react";
import { Row, Col } from "antd";
import ThreadInputMsg from "./ThreadInputMsg";
import MessageList from "./MessageList";
import "./ThreadCommon.css";
import "./Thread.css";

export default function Thread(props) {
  const {
    currentDisplay,
    clickedMsg,
    replies,
    makeNoReplyMessage,
    handleClickReply,
    handleReplyClose,
    handleClickProfile,
  } = props;
  console.log("클릭드메시지 =", clickedMsg);
  if (clickedMsg.length) {
    return (
      <div className="Thread-container Thread-scroll">
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
                thread={true}
                msgs={makeNoReplyMessage(clickedMsg[0])}
                handleClickReply={handleClickReply}
                handleClickProfile={handleClickProfile}
              />
            ) : (
              <div></div>
            )}
          </Row>

          <Row className="Thread-sm-pad">
            {clickedMsg[0].replyCount ? (
              <div className="Thread-hr">
                <span>{clickedMsg[0].replyCount}개의 댓글</span>
              </div>
            ) : (
              <div></div>
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
              <div></div>
            )}
          </Row>
          <Row>
            <ThreadInputMsg props={props} currentDisplay={currentDisplay} />
          </Row>
        </Col>
      </div>
    );
  } else return <div></div>;
}
