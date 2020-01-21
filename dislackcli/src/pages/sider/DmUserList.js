import React from "react";

const DmUserList = props => {
  const { userList, clickUser } = props;
  console.log("유저목록", userList);
  return (
    <div>
      <div
        onClick={e => {
          clickUser(e.target.innerHTML);
        }}
      >
        {userList.name}
      </div>
    </div>
  );
};

export default DmUserList;
