import React from "react";
import { Row, Col } from "antd";
import MemberInfo from "./MemberInfo";

export default function MemberList(props) {
  const { filteredMembers, handleClickProfile } = props;
  if (filteredMembers && filteredMembers.length) {
    return (
      <div>
        <Col
          span={9}
          style={{
            backgroundColor: "#eeeeee",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <Row>Members in this Channel</Row>
          <Row>Member : {filteredMembers.length}</Row>
          <Row>
            <Col>
              {filteredMembers.map((member, i) => {
                console.log("각 멤버들 정보", member);
                return (
                  <MemberInfo
                    key={i}
                    {...member}
                    handleClickProfile={handleClickProfile}
                  />
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
