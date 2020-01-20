import React from "react";
import { Avatar, Row, Col, Button, Comment } from "antd";
import "./MessageEntries.css";

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
  const reCount =
    replyCount && replyCount > 0 ? (
      <div className="yeseReply">
        <a onClick={handleClickReply.bind(null, id)}>{replyCount}개의 댓글</a>
      </div>
    ) : (
      <div className="noReply" style={{ height: 0 }} />
    );
  return (
    <div id={id} style={{ padding: 0 }}>
      <Comment
        author={
          <strong style={{ fontSize: "20px" }}>
            <a onClick={handleClickProfile.bind(null, user.id)}>{user.name}</a>
          </strong>
        }
        avatar={<Avatar shape="square" size="large" icon="user" />}
        content={message || reply}
        datetime={time}
        actions={[reCount]}
      />
    </div>
  );
}
