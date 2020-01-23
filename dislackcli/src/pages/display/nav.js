import React from "react";
import { Row, Col, Icon, Input, Modal, Button, Divider } from "antd";
import { relative } from "path";
import axios from "axios";
import ModalRender from "./ModalRender";

const { Search } = Input;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, modalMsgs: null, userCount: null };
  }

  showModal = (e, val) => {
    this.setState(() => ({
      visible: true,
      target: e,
    }));
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
    const curMsgs = this.props.msgs;
    const searchArr = curMsgs.filter(val1 => {
      const itemArr = item.split("");
      const val1Arr = val1.message.split("");
      for (let i = 0; i < val1Arr.length; i++) {
        for (let j = 0; j < itemArr.length; j++) {
          if (val1Arr[i] === itemArr[j] && val1[i + 1] === itemArr[j + 1]) {
            return val1;
          }
        }
      }
    });
    cb(searchArr);
  };

  searchSet(value) {
    this.setState({ modalMsgs: value });
  }

  // 모든 유저 불러오기
  getUserList = () => {
    axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/user/list`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        // res.data는 유저데이터
        this.setState({ userCount: res.data.length });
      });
  };

  // LifeCycle
  componentDidMount() {
    this.getUserList();
  }

  render() {
    const {
      currentDisplay,
      channels,
      msgs,
      isLogin,
      handleClickMemberList,
      state,
    } = this.props;

    return (
      <Row gutter={[8, 8]} className="nav-Row">
        <Col span={8} style={{ marginTop: "7px" }}>
          <strong style={{ fontSize: "20px", margin: "2%" }}>
            #{" "}
            {currentDisplay.name
              ? currentDisplay.name
              : currentDisplay.users[0].name}
          </strong>
          <div>
            <Icon type="star" style={{ marginLeft: "1%", marginRight: "1%" }} />
            <Icon type="line" rotate={90} />
            <Icon
              type="user"
              onClick={handleClickMemberList}
              style={{ marginLeft: "1%", marginRight: "1%" }}
            />
            {this.state.userCount}
            <Icon type="line" rotate={90} />
            <Icon
              type="pushpin"
              style={{ marginLeft: "1%", marginRight: "1%" }}
            />
          </div>
        </Col>
        <Col span={6} />
        <Col span={10} style={{ marginTop: "16px" }}>
          <Icon type="info-circle" />
          <Icon type="setting" style={{ marginLeft: "1%" }} />
          <Search
            placeholder="Input Search Text"
            onSearch={item => {
              const ms = this.state.modalMsgs;
              this.currentMsgs(item, async res => {
                this.searchSet(res);
                this.showModal(item, ms);
              });
            }}
            style={{ width: "300px", marginLeft: "1%" }}
          />
          <Icon type="play-circle" style={{ marginLeft: "1%" }} />
          <Icon type="star" style={{ marginLeft: "1%" }} />

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
            style={{ overflow: "scroll", height: "500px", overflowX: "hidden" }}
          >
            {this.state.modalMsgs ? (
              this.state.modalMsgs.map(item => (
                <ModalRender renderMsg={item} key={Math.random()} />
              ))
            ) : (
              <div />
            )}
          </Modal>
        </Col>
      </Row>
    );
  }
}
export default Nav;
