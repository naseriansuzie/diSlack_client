import React from "react";
import { Comment, Avatar } from "antd";

const DmUserList = props => {
  const { userList, clickUser } = props;
  const imgs = [
    "https://ca.slack-edge.com/TEYSE8X7A-UGZKRTKS7-g1211904810f-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGTATM4SZ-gb1c54dce61e-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGT1WBY5T-g29afd645804-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UGT2ASV3P-g125e42e1fcb-512",
    "https://ca.slack-edge.com/TEYSE8X7A-UF0L7NKM5-g387a4cd39e1-512",
  ];
  const num = Math.floor(Math.random() * 4) + 1;
  return (
    <div>
      <div
        onClick={e => {
          clickUser(e.target.innerHTML);
        }}
      >
        <Comment
          author={
            <a style={{ marginTop: "6px" }}>
              <strong style={{ fontSize: "15px", fontSize: "20px" }}>
                {" "}
                {userList.name}
              </strong>
            </a>
          }
          avatar={<Avatar src={`${imgs[num]}`} alt={userList.name} />}
        />
      </div>
    </div>
  );
};

export default DmUserList;
