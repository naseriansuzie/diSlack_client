import React from "react";
import MessageEntries from "./MessageEntries";

export default function MessageList(props) {
  const { handleClickReply, handleClickProfile, handleCreateReply } = props;
  let { msgs } = props;
  msgs = msgs.map(msg => {
    const dateTime = msg.createdAt
      .split("T")
      .join(" ")
      .split(".")[0]
      .split(" ");
    msg.date = dateTime[0];
    msg.time = dateTime[1].split(":");
    const hour = Number(msg.time[0]) + 9;
    msg.time.splice(0, 1, hour);
    msg.time = msg.time.join(":");
    return msg;
  });

  return (
    <div>
      <div>
        {msgs ? (
          msgs.map((msg, i) => (
            <MessageEntries
              key={i}
              {...msg}
              handleClickReply={handleClickReply}
              handleClickProfile={handleClickProfile}
              handleCreateReply={handleCreateReply}
            />
          ))
        ) : (
          <h1>No Content</h1>
        )}
      </div>
    </div>
  );
}
