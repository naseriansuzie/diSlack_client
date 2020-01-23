import React from "react";
import { Comment, Icon, Tooltip, Avatar } from "antd";

export default function MessageList(props) {
  const { id, user_id, user, time, message, reply } = props.renderMsg;
  const imgs = [
    "https://ca.slack-edge.com/TEYSE8X7A-UGZKRTKS7-g1211904810f-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGTATM4SZ-gb1c54dce61e-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGT1WBY5T-g29afd645804-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGT2ASV3P-g125e42e1fcb-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UF0L7NKM5-g387a4cd39e1-512",
  ];
  const num = Math.floor(Math.random() * 4) + 1;
  return (
    <div style={{ width: "700px" }}>
      <Comment
        author={
          <a>
            <strong style={{ fontSize: "15px" }}>{user.name}</strong>
          </a>
        }
        avatar={<Avatar src={`${imgs[num]}`} alt={user.name} />}
        content={<p>{message}</p>}
        // datetime={<Tooltip>{reTime}</Tooltip>}
      />
    </div>
  );
}
