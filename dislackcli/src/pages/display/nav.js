import React from "react";
import { Row, Col, Icon, Input, Modal, Button } from "antd";
import { relative } from "path";
import ModalRender from "./ModalRender";

const { Search } = Input;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, modalMsgs: null };
  }

  // 라이프 사이클로 컴포넌트디드업데이트

  showModal = (e, val) => {
    // console.log("모달스테이트", val);
    this.setState(() => ({
      visible: true,
      target: e,
    }));

    // console.log(this.state);
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
  currentMsgs = (item, cb) => {
    const searchArr = [];
    const curMsgs = this.props.msgs;
    curMsgs.map(val1 => {
      // console.log("메세지들? : ", val1);
      const wordMsg = val1.message.split(" ");
      wordMsg.map(val2 => {
        // console.log("쪼갠메세지 : ", val2);
        if (val2 === item) {
          searchArr.push(val1);
        }
      });
      // console.log("찾은단어들", searchArr);
      cb(searchArr);
    });
  };

  searchSet(value) {
    console.log("서치셋", value);
    this.setState({ modalMsgs: value });
  }

  render() {
    const { channels, msgs, isLogin, handleClickMemberList } = this.props;
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
          <Button onClick={handleClickMemberList}>member</Button>
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
              const ms = this.state.modalMsgs;
              await this.currentMsgs(item, async res => {
                await this.searchSet(res);
                await this.showModal(item, ms);
              });
            }}
            style={{ width: 200 }}
          />
          <Modal
            title={
              this.state.target ? (
                <div>
                  무엇을 원하는가...? <strong>{this.state.target}</strong>
                </div>
              ) : (
                "Empty"
              )
            }
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={1400}
          >
            {this.state.modalMsgs ? (
              this.state.modalMsgs.map(item => {
                console.log("모달_매핑 ? ", item);
                return <ModalRender renderMsg={item} key={Math.random()} />;
              })
            ) : (
              <div />
            )}
          </Modal>

          <Icon type="setting" />
        </Col>
      </Row>
    );
  }
}

export default Nav;
