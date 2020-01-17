import React from "react";
import { Row, Col, Icon, Input, Modal } from "antd";

const { Search } = Input;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, searchMsg: null };
  }

  showModal = e => {
    console.log(e);
    this.setState(() => ({
      visible: true,
      target: e,
    }));

    console.log(this.state);
  };

  handleOk = e => {
    this.setState(() => ({
      visible: false,
    }));
  };

  handleCancel = e => {
    this.setState(() => ({
      visible: false,
    }));
  };

  // 현재 메세지들을 단어벌로 찾을 수 있게 검색하자
  currentMsgs = item => {
    const searchArr = [];
    const curMsgs = this.props.msgs;
    curMsgs.map(val1 => {
      console.log("메세지들? : ", val1);
      const wordMsg = val1.message.split(" ");
      wordMsg.map(val2 => {
        console.log("쪼갠메세지 : ", val2);
        if (val2 === item) {
          searchArr.push(val1);
        }
      });
      console.log("찾은단어들", searchArr);
    });
  };

  searchSet(value) {
    this.setState(() => {
      this.setState({ searchMsg: value });
    });
  }

  render() {
    const { channels, msgs, isLogin } = this.props;
    // const { userInfo } = this.props.props;
    // console.log("NAV_PROPS : ", this.props);
    // console.log(msgs);
    return (
      <Row>
        <Col span={8}>
          <strong style={{ fontSize: "30px" }}>{channels[0].name}</strong>
          <Icon
            type="aliwangwang"
            theme="filled"
            // 로그인 되어 있으면 #2ecc71 || #bdc3c7
            style={{ fontSize: "20px", marginLeft: "1%", color: "#2ecc71" }}
          />
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
            onSearch={async item => {
              await this.currentMsgs(item);
              await this.showModal(item);
            }}
            style={{ width: 200 }}
          />
          <Modal
            title={this.state.target ? this.state.target : "Empty"}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>

          <Icon type="setting" />
        </Col>
      </Row>
    );
  }
}

export default Nav;
