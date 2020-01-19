import React from "react";
import { List, Button, Row, Col } from "antd";

export default function UserProfile(props) {
  const { clickedUser, handleProfileClose } = props;
  if (clickedUser) {
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
                Check out Your Colleague
              </div>
            </Col>
            <Col span={4}>
              <a
                style={{ fontSize: "1.5em", fontWeight: "bold" }}
                onClick={handleProfileClose}
              >
                X
              </a>
            </Col>
          </Row>
          <Row>
            <img src="https://avatars0.githubusercontent.com/u/35153917?s=460&v=4" />
          </Row>
          <Row>
            <Col
              span={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button style={{ width: "90%" }}>Message</Button>
            </Col>
            <Col
              span={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button style={{ width: "90%" }}>Edit Profile</Button>
            </Col>
          </Row>
          <h2 style={{ margin: "16px 0" }}>Good Day!</h2>
          <List
            size="large"
            bordered
            dataSource={[clickedUser]}
            renderItem={clickedUser => (
              <div>
                <List.Item>
                  <h4>Name</h4>
                  {clickedUser.name}
                </List.Item>
                <List.Item>
                  <h4>Local Time</h4>
                  {new Date().toLocaleTimeString()}
                </List.Item>
                <List.Item>
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
