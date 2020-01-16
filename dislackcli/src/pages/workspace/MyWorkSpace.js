import { List, Avatar, Row, Col, Button } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";

export default function MyWorkSpace(props) {
  const { isLogin } = props;
  return isLogin ? (
    <Col>
      <div>
        <Row style={{ height: "600px" }}>
          <Col span={6} />
          <Col span={12}>
            <Row
              style={{ padding: "10px", fontWeight: "bold", fontSize: "2em" }}
            >
              My Workspace
            </Row>
            <Row style={{ padding: "10px" }}>
              {props.userInfo.name}'s Workspace
            </Row>
            <List
              itemLayout="horizontal"
              dataSource={props.workSpaceList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9" />
                    }
                    title={item.name}
                    description={`${process.env.REACT_APP_DEV_URL}/${item.code}`}
                  />
                  <Button>Launch</Button>
                </List.Item>
              )}
            />
          </Col>
          <Col span={6} />
        </Row>
      </div>
    </Col>
  ) : (
    <div>
      <Redirect to="/signin" />
    </div>
  );
}
