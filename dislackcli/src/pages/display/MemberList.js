import React from "react";
import { Button, Row, Col, Avatar, List } from "antd";
import MemberInfo from "./MemberInfo";
import "./ThreadCommon.css";
import "./MemberList.css";

function invitePerson() {
  console.log("invite api를 넣을 예정입니다");
}
export default function MemberList(props) {
  const { filteredMembers, handleClickProfile, handleMemberListClose } = props;
  if (filteredMembers && filteredMembers.length) {
    return (
      <div className="Thread-container">
        <Col>
          <Row
            style={{ padding: "20px 10px" }}
            className="Thread-back-color ant-list-item ant-list-bordered Thread-list-none"
          >
            <Col span={20} className="Member-list-align">
              <li className="Thread-header-col Thread-title ">
                About This Channel
              </li>
            </Col>
            <Col span={4} className="Thread-center">
              <a
                className="Thread-header-col Thread-X"
                onClick={handleMemberListClose}
              >
                X
              </a>
            </Col>
          </Row>
          <Row className="Thread-scroll">
            <li className="Thread-list-none Member-list-align ant-list-item ant-list-bordered ">
              <span className="Member-img-pad">
                <Avatar src="https://image.flaticon.com/icons/svg/1014/1014769.svg" />
              </span>
              <span>Channel Details</span>
            </li>
            <li className="Thread-list-none Member-list-align ant-list-item ant-list-bordered">
              <span className="Member-img-pad">
                <Avatar src="https://image.flaticon.com/icons/svg/685/685156.svg" />
              </span>
              <span>Highlights</span>
            </li>
            <li className="Thread-list-none Member-list-align ant-list-item ant-list-bordered">
              <span className="Member-img-pad">
                <Avatar src="https://image.flaticon.com/icons/svg/1014/1014795.svg" />
              </span>
              <span>Pinned Items</span>
            </li>

            <ul className="Thread-list-none Member-cnt-font ant-list-item ant-list-bordered">
              <Col className="Thread-wid">
                <Row className="Member-list-align">
                  <Col>
                    <span className="Member-img-pad">
                      <Avatar src="https://www.chinaplasonline.com/CPS19/Files/Image/Content/icon_user_0125.png" />
                    </span>
                    <span>
                      {filteredMembers.length < 2
                        ? `${filteredMembers.length} Member Here!`
                        : `${filteredMembers.length} Members Here!`}
                    </span>
                  </Col>
                  <Col>
                    {filteredMembers.map((member, i) => (
                      <MemberInfo
                        key={i}
                        {...member}
                        handleClickProfile={handleClickProfile}
                      />
                    ))}
                  </Col>
                </Row>
                <Row>
                  <li
                    style={{ borderBottom: "0" }}
                    className="ant-list-item Thread-center Thread-list-none Member-disp"
                  >
                    <div>
                      <Button className="Member-btn" onClick={invitePerson}>
                        Add People
                      </Button>
                    </div>
                  </li>
                </Row>
              </Col>
            </ul>
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
