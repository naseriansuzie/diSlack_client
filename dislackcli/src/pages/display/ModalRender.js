import React from "react";
import { Comment, Icon, Tooltip, Avatar } from "antd";

export default function MessageList(props) {
  const { id, user_id, username, time, message, reply } = props.renderMsg;
  // const reTime = time.join(":");
  // console.log(reTime);
  // console.log(props.renderMsg);
  return (
    <div style={{ width: "700px" }}>
      <Comment
        author={
          <a>
            <strong>{username}</strong>
          </a>
        }
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt={username}
          />
        }
        content={<p>{message}</p>}
        // datetime={<Tooltip>{reTime}</Tooltip>}
      />
    </div>
  );
}
