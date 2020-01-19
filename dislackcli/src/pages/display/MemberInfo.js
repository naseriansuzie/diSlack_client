import React from "react";
import { Avatar, Row, Col } from "antd";

export default function MemberInfo(props) {
  const { id, name, handleClickProfile } = props;
  return (
    <div id={`member${id}`} onClick={handleClickProfile}>
      <Col span={2}>
        <Avatar src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png" />
      </Col>
      <Col>
        <Row>
          <div style={{ padding: "5px" }}>{name}</div>
        </Row>
      </Col>
    </div>
  );
}
