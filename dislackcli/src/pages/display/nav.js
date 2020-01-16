import React from "react";
import { Row, Col, Icon, Input, Modal } from "antd";

const { Search } = Input;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showModal = e => {
    // console.log(e);

    this.setState(() => ({
      visible: true,
      target: e,
    }));

    console.log(this.state);
  };

  handleOk = e => {
    // console.log(e);
    this.setState(() => ({
      visible: false,
    }));
  };

  handleCancel = e => {
    // console.log(e);
    this.setState(() => ({
      visible: false,
      // target: "",
    }));
    // console.log(this.state);
  };

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
            onSearch={
              (value => {
                const searchArr = [];
                msgs.map(item => {
                  const { msg } = item;
                  const arrMsg = msg.split(" ");
                  arrMsg.map(searchItem => {
                    // console.log(item);
                    if (searchItem === value) {
                      // console.log("검색한단어", value);
                      console.log("찾은단어", item);
                      searchArr.push(item);
                      // X표시를 누르면 다시 GET요청을 한다.
                    }
                  });
                  // this.setState({ searchMsgs: searchArr });
                });
                // console.log(searchArr);
                this.setState(() => ({ searchMsgs: searchArr }));
                console.log("찾은 뒤 STATE", this.state);
              },
              e => {
                this.showModal(e);
              })
            }
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
