import React from "react";

export default function MemberInfo(props) {
  const { id, name, handleClickProfile } = props;
  return (
    <div id={`member${id}`} onClick={handleClickProfile}>
      {name}
    </div>
  );
}
