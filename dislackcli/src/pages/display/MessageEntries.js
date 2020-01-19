import React from "react";
import { Avatar, Row, Col, Button } from "antd";

export default function MessageEntries(props) {
  const {
    thread,
    id,
    user,
    time,
    message,
    reply,
    replyCount,
    handleClickReply,
    handleClickProfile,
  } = props;
  return (
    <div id={id}>
      <Row style={{ width: "100%" }}>
        <Col span={1} style={{ padding: "5px 0 5px 5px" }}>
          <Avatar shape="square" size="large" icon="user" />
        </Col>
        <Col span={19} style={{ padding: "5px 0 5px 15px" }}>
          <span>
            <strong>
              <a onClick={handleClickProfile.bind(null, user.id)}>
                {user.name}
              </a>
            </strong>
            &nbsp;&nbsp;&nbsp;
          </span>
          <span>{time}</span>
          &nbsp;&nbsp;&nbsp;
          {message && thread !== true ? (
            <span>
              <Button onClick={handleClickReply.bind(null, id)}>
                댓글 달기
              </Button>
            </span>
          ) : (
            <span></span>
          )}
          <div>{message ? message : reply}</div>
          {replyCount && replyCount > 0 ? (
            <div>
              <a onClick={handleClickReply.bind(null, id)}>
                {replyCount}개의 댓글
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
    </div>
  );
}
