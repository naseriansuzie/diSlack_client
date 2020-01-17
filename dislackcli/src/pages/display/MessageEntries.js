import React from "react";
import { Avatar, Row, Col } from "antd";

export default function MessageEntries(props) {
  // console.log(("메세지엔트리": props));
  const {
    id,
    user,
    username,
    time,
    message,
    replies,
    handleClickReply,
    handleClickProfile,
  } = props;
  return (
    <div id={id}>
      <Row style={{ width: "100%" }}>
        <Col span={1}>
          <Avatar shape="square" size="large" icon="user" />
        </Col>
        <Col span={22}>
          <span>
            <strong>
              <a onClick={handleClickProfile.bind(null, user)}>{username}</a>
            </strong>
            &nbsp;&nbsp;&nbsp;
          </span>
          <span>{time}</span>
          <div>{message}</div>
          {replies && replies.length ? (
            <div>
              <a onClick={handleClickReply.bind(null, id)}>
                {replies.length} replies
              </a>
            </div>
          ) : (
            <div />
          )}
        </Col>
      </Row>
    </div>
  );
}
