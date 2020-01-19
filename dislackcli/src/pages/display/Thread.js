import React from "react";
import { Row, Col } from "antd";
import ThreadInputMsg from "./ThreadInputMsg";
import MessageList from "./MessageList";

export default function Thread(props) {
  const {
    currentWorkspace,
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
      <div
        style={{
          height: "100%",
        }}
      >
        <Col
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
              <a onClick={handleReplyClose}>X</a>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            {clickedMsg.length ? (
              <MessageList
                msgs={makeNoReplyMessage(clickedMsg[0])}
                handleClickReply={handleClickReply}
                handleClickProfile={handleClickProfile}
              />
            ) : (
              <div></div>
            )}
          </Row>

          <Row style={{ padding: "10px" }}>
            {clickedMsg[0].replyCount
              ? `Reply on this Message - ${clickedMsg[0].replyCount}`
              : ""}
          </Row>

          <Row style={{ padding: "5px" }}>
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
