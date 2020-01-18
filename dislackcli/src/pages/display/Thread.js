import React from "react";
import { Row, Col } from "antd";
import InputMsg from "./inputMsg";
import MessageList from "./MessageList";

export default function Thread(props) {
  const {
    currentWorkspace,
    currentDisplay,
    clickedMsg,
    makeNoReplyMessage,
    handleClickReply,
    handleClickReplyClose,
    handleClickProfile,
  } = props;
  console.log("클릭드메시지 =", clickedMsg);
  if (clickedMsg.length) {
    return (
      <div>
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
            Reply on this Message : {clickedMsg[0].reply.length}
          </Row>
          <Row style={{ padding: "5px" }}>
            {clickedMsg.length ? (
              <MessageList
                msgs={clickedMsg[0].reply}
                handleClickReply={handleClickReply}
                handleClickProfile={handleClickProfile}
              />
            ) : (
              <div></div>
            )}
          </Row>
          <Row>
            <InputMsg props={props} currentDisplay={currentDisplay} />
          </Row>
        </Col>
      </div>
    );
  } else return <div></div>;
}
