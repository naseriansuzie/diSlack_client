import React from "react";
import { Avatar, Row, Col } from "antd";

export default function MessageEntries(props) {
  const {
    id,
    user_id,
    username,
    time,
    message,
    reply,
    handleClickReply,
    handleClickProfile,
  } = props;
  return (
    <div id={id}>
      <Row style={{ width: "100%" }}>
        <Col span={1} style={{ padding: "5px 0 5px 5px" }}>
          <Avatar src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png" />
        </Col>
        <Col span={19} style={{ padding: "5px 0 5px 15px" }}>
          <span>
            <strong>
              <a onClick={handleClickProfile.bind(null, user_id)}>{username}</a>
            </strong>
            &nbsp;&nbsp;&nbsp;
          </span>
          <span>{time}</span>
          <div>{message}</div>
          {reply && reply.length ? (
            <div>
              <a onClick={handleClickReply.bind(null, id)}>
                {reply.length} replies
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
