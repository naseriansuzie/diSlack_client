import React from "react";
import { Button, Row, Col, Avatar, Modal } from "antd";
import axios from "axios";
import MemberInfo from "./MemberInfo";
import Invitation from "./Invitation";
import "./ThreadCommon.css";
import "./MemberList.css";

export default class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visibleInvite: false, email: "" };
    this.handleOKInvite = this.handleOKInvite.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleOKInvite = e => {
    this.setState({ visibleInvite: false });
  };

  handleCancel = e => {
    this.setState({ visibleInvite: false });
  };

  showModalInvite = () => {
    this.setState({ visibleInvite: true });
  };

  updateEmail(e) {
    const val = e.target.value;
    this.setState({ email: val });
  }

  sendEmail() {
    console.log(this.state);
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/link`,
        { email: this.state.email },
        { withCredentials: true },
      )
      .then(res => this.setState({ email: "" }))
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        } else console.log(err);
      });
  }

  render() {
    const {
      filteredMembers,
      handleClickProfile,
      handleMemberListClose,
      currentWorkspace,
    } = this.props;
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
                        <Button
                          className="Member-btn"
                          onClick={e => {
                            this.showModalInvite(e);
                          }}
                        >
                          Add People
                        </Button>
                      </div>
                      <Modal
                        title="Invite Person"
                        visible={this.state.visibleInvite}
                        onOk={() => {
                          this.sendEmail();
                          this.handleOKInvite();
                        }}
                        onCancel={() => {
                          this.handleCancel();
                        }}
                      >
                        <Invitation
                          updateEmail={this.updateEmail}
                          sendEmail={this.sendEmail}
                          handleOKInvite={this.handleOKInvite}
                          handleCancel={this.handleCancel}
                          currentWorkspace={currentWorkspace}
                        />
                      </Modal>
                    </li>
                  </Row>
                </Col>
              </ul>
            </Row>
          </Col>
        </div>
      );
    }
    return <div>멤버가 없습니다</div>;
  }
}
