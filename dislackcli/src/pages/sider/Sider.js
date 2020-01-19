import React from "react";
import { Menu, Icon, Modal, Button } from "antd";
import PlusChannel from "./PlusChannel";
import "antd/dist/antd.css";
import axios from "axios";

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
      visible: false,
      newName: "",
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  // lifeCycle
  componentDidMount() {}

  // 채널명을 적어서 서버에 보내자
  handleState = item => {
    this.setState(() => {
      this.setState({ newName: item });
    });
  };

  // 모달 메소드 (showModal, handleOk, handleCancel)
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 채널생성 OK
  handleOk = e => {
    this.setState({
      visible: false,
    });
    console.log("채널생성이름", this.state.newName);
    const newCN = {
      name: this.state.newName,
      type: "public",
    };
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/channel/create`,
        newCN,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        console.log("채널생성보냄!", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleClick = e => {
    console.log("채널click :", e);
    this.setState({
      current: e.key,
    });
  };

  clickedChannel = e => {
    console.log("채널이클릭되었습니다 : ", e);
  };

  render() {
    // console.log("SIDER_PROPS", this.props);
    const { channels, dms } = this.props;
    const { current } = this.state;
    return (
      <div style={{ height: "100%" }}>
        <Menu
          onClick={this.handleClick}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#38ada9",
            color: "white",
          }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
        >
          <div style={{ marginTop: "5%", marginBottom: "7%" }}>
            Chanenl{" "}
            <Icon
              type="plus-circle"
              style={{ marginLeft: "3%" }}
              onClick={e => {
                this.showModal(e);
              }}
            />
          </div>

          {channels.map((item, i) => (
            <Menu.Item
              key={i}
              style={{
                backgroundColor: "#38ada9",
                color: "#ecf0f1",
                margin: "0",
                height: "30px",
              }}
              onClick={e => {
                this.clickedChannel(e);
              }}
            >
              <Icon type="container" style={{ marginRight: "3%" }} />
              {item.name}
            </Menu.Item>
          ))}
          <div style={{ marginTop: "10%", marginBottom: "7%" }}>Dm</div>
          {dms.map((item, i) => (
            <Menu.Item
              key={i}
              style={{
                backgroundColor: "#38ada9",
                color: "#ecf0f1",
                margin: "0",
                height: "30px",
              }}
              onClick={e => {
                this.clickedChannel(e);
              }}
            >
              <Icon type="message" style={{ marginRight: "3%" }} />
              {item.name}
            </Menu.Item>
          ))}
        </Menu>

        {/* 채널생성 모달 */}
        <Modal
          title="Create Channel"
          visible={this.state.visible}
          onOk={() => {
            this.handleOk();
          }}
          onCancel={this.handleCancel}
        >
          <PlusChannel
            handleOk={this.handleOk}
            handleState={this.handleState}
          />
        </Modal>
      </div>
    );
  }
}

export default Side;
