import React from "react";

const DmUserList = props => {
  const { userList, clickUser } = props;
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
