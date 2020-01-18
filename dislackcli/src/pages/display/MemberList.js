import React from "react";
import { Row, Col } from "antd";
import MemberInfo from "./MemberInfo";

export default function MemberList(props) {
  const { filteredMembers, handleClickProfile, handleMemberListClose } = props;
  if (filteredMembers && filteredMembers.length) {
    return (
      <div
        style={{
          height: "100%",
        }}
      >
        <Col
          style={{
            backgroundColor: "#eeeeee",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <Row>
            <Col span={20}>
              <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Members in this Channel
              </div>
            </Col>
            <Col span={4}>
              <a
                style={{ fontSize: "1.5em", fontWeight: "bold" }}
                onClick={handleMemberListClose}
              >
                X
              </a>
            </Col>
          </Row>
          <Row
            style={{
              fontSize: "1em",
              fontWeight: "bold",
              padding: "10px 0 10px 0",
            }}
          >
            Member : {filteredMembers.length}
          </Row>
          <Row>
            <Col>
              {filteredMembers.map((member, i) => {
                console.log("각 멤버들 정보", member);
                return (
                  <Row>
                    <MemberInfo
                      key={i}
                      {...member}
                      handleClickProfile={handleClickProfile}
                    />
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Col>
      </div>
    );
  } else return <div>멤버가 없습니다</div>;
}
//만약 필터드 멤버스가 존재하면 -> 정상적으로 보여주기
// 하나 콜럼 안에
// 로우로 Members in This Channel
// 로우로 n members
// 로우 안에
//콜럼 안에 맵으로 멤버인포 컴포넌트 뿌리기 -> 컴포넌트 또 맹글어야 하넹? 키, 이미지, 이름(나이면 (you)추가)
//없으면 Loading...
