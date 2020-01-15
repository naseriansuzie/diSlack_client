import React from "react";
import MessageEntries from "./MessageEntries";

export default function MessageList(props) {
  const { handleClickReply, handleClickProfile } = props;
  let { msgs } = props;
  msgs = msgs.map(msg => {
    let dateTime = msg.created_at.split(" ");
    msg.date = dateTime[0];
    msg.time = dateTime[1];
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
            />
          ))
        ) : (
          <h1>No Content</h1>
        )}
      </div>
    </div>
  );
}
