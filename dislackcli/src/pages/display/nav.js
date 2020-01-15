import React from "react";
import { Row, Col, Icon, Input } from "antd";

const { Search } = Input;

const Nav = props => {
  console.log("NAV_PROPS : ", props);

  return (
    <Row>
      <Col span={8}>
        ChannelName <Icon type="aliwangwang" />
      </Col>
      <Col span={8} />
      <Col span={8}>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <Icon type="setting" />
      </Col>
    </Row>
  );
};

export default Nav;
