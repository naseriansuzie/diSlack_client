import React from "react";
import { List, Button, Row, Col } from "antd";
import "./UserProfile.css";

export default function UserProfile(props) {
  const { clickedUser, handleProfileClose } = props;
  if (clickedUser) {
    return (
      <div className="User-container">
        <Col className="User-scroll">
          <List
            size="large"
            bordered
            dataSource={[clickedUser]}
            renderItem={clickedUser => (
              <div>
                <List.Item className="User-back-color">
                  <Col span={20} className="User-center">
                    <div className="User-header-col User-title">
                      Check out Your Colleague
                    </div>
                  </Col>
                  <Col span={4} className="User-center">
                    <a
                      className="User-header-col User-X"
                      onClick={handleProfileClose}
                    >
                      X
                    </a>
                  </Col>
                </List.Item>
                <List.Item style={{ border: "0", padding: "0" }}>
                  <img
                    className="User-img-size"
                    src="https://ca.slack-edge.com/TPZ4UBX3M-UQCUMDEJH-g946740d6c76-512"
                  />
                </List.Item>
                <List.Item>
                  <Col span={12} className="User-btn-display">
                    <Button className="User-btn User-text">Message</Button>
                  </Col>
                  <Col span={12} className="User-btn-display">
                    <Button className="User-btn User-text">Edit Profile</Button>
                  </Col>
                </List.Item>
                <List.Item className="User-pad">
                  <h3 className="User-text">Good Day!</h3>
                </List.Item>
                <List.Item className="User-list-item">
                  <h4>Name</h4>
                  {clickedUser.name}
                </List.Item>
                <List.Item className="User-list-item">
                  <h4>Local Time</h4>
                  {new Date().toLocaleTimeString()}
                </List.Item>
                <List.Item className="User-list-item">
                  <h4>Email</h4>
                  {clickedUser.email}
                </List.Item>
              </div>
            )}
          />
        </Col>
      </div>
    );
  } else return <div>사용자를 다시 찾아주세요!</div>;
}
