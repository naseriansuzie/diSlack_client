import React from "react";
import { Avatar, Row, Col } from "antd";

export default function MemberInfo(props) {
  const { id, name, handleClickProfile } = props;
  const imgs = [
      "https://ca.slack-edge.com/TEYSE8X7A-UGZKRTKS7-g1211904810f-512",
      "https://ca.slack-edge.com/TEYSE8X7A-UGTATM4SZ-gb1c54dce61e-512",
      "https://ca.slack-edge.com/TEYSE8X7A-UGT1WBY5T-g29afd645804-512",
      "https://ca.slack-edge.com/TEYSE8X7A-UGT2ASV3P-g125e42e1fcb-512",
      "https://ca.slack-edge.com/TEYSE8X7A-UF0L7NKM5-g387a4cd39e1-512",
    ],
    num = Math.floor(Math.random() * 4) + 1;
  return (
    <div
      id={`member${id}`}
      onClick={handleClickProfile.bind(null, id)}
      className="ant-list-item"
    >
      <Col span={2}>
        <Avatar src={`${imgs[num]}`} />
      </Col>
      <Col>
        <Row>
          <div style={{ padding: "5px" }}>{name}</div>
        </Row>
      </Col>
    </div>
  );
}
