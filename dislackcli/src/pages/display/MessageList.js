import React from "react";
import MessageEntries from "./MessageEntries";

export default function MessageList(props) {
  // "2020-01-17 13:59:40"
  // "2020-01-17T04:59:40.000Z"

  const { handleClickReply, handleClickProfile } = props;
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
  console.log("메세지리스트 : ", msgs);
  return (
    <div>
      <div>
        {msgs ? (
          msgs.map((msg, i) => {
            console.log("메세지맵핑", msg);
            return (
              <MessageEntries
                key={i}
                {...msg}
                handleClickReply={handleClickReply}
                handleClickProfile={handleClickProfile}
              />
            );
          })
        ) : (
          <h1>No Content</h1>
        )}
      </div>
    </div>
  );
}
