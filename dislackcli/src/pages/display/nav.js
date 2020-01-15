import React from "react";
import { Row, Col, Icon, Input } from "antd";
import ClearableLabeledInput from "antd/lib/input/ClearableLabeledInput";

const { Search } = Input;

const Nav = props => {
  console.log("NAV_PROPS : ", props);
  const { channels, msgs } = props;
  const { userInfo } = props.props;
  console.log(msgs);
  return (
    <Row>
      <Col span={8}>
        <strong style={{ fontSize: "30px" }}>{channels[0].name}</strong>
        <Icon type="aliwangwang" style={{ fontSize: "30px" }} />
      </Col>
      <Col span={8} />
      <Col span={8}>
        <Search
          placeholder="Input Search Text"
          prefix={
            <Icon
              type="close-circle"
              onClick={() => {
                console.log("DELETE");
              }}
            />
          }
          onSearch={value => {
            msgs.map(item => {
              const { msg } = item;
              const arrMsg = msg.split(" ");
              arrMsg.map(searchItem => {
                // console.log(item);
                if (searchItem === value) {
                  console.log("검색한단어", value);
                  console.log("찾은단어", item);
                  // X표시를 누르면 다시 GET요청을 한다.
                }
              });
            });
          }}
          style={{ width: 200 }}
        />

        <Icon type="setting" />
      </Col>
    </Row>
  );
};

export default Nav;
