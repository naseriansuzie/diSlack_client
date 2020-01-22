import React from "react";
import { Avatar, Row, Col, Button, Comment, Icon } from "antd";
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
    replies,
    handleClickReply,
    handleClickProfile,
  } = props;

  const reCount =
    replyCount && replyCount > 0 && !replies.length ? (
      <div className="yeseReply">
        <a onClick={handleClickReply.bind(null, id)}>{replyCount}개의 댓글</a>
      </div>
    ) : (
      <div className="noReply" style={{ height: 0 }} />
    );

  const imgs = [
    "https://ca.slack-edge.com/TEYSE8X7A-UGZKRTKS7-g1211904810f-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGTATM4SZ-gb1c54dce61e-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGT1WBY5T-g29afd645804-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGT2ASV3P-g125e42e1fcb-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UF0L7NKM5-g387a4cd39e1-512",
  ];
  const num = Math.floor(Math.random() * 4) + 1;

  return (
    <div id={id} style={{ padding: 0 }}>
      <Comment
        className="MessageEntries-Comment"
        author={
          <strong style={{ fontSize: "20px" }}>
            <a onClick={handleClickProfile.bind(null, user.id)}>{user.name}</a>
          </strong>
        }
        avatar={<Avatar shape="square" src={`${imgs[num]}`} />}
        content={
          <div>
            {message || reply}
            <span>
              <Icon
                className="MessageEntries-Icon"
                type="form"
                onClick={handleClickReply.bind(null, id)}
              />
            </span>
          </div>
        }
        datetime={time}
        actions={[reCount]}
      />
    </div>
  );
}
