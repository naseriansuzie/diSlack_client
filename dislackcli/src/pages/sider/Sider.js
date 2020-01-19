import React from "react";
import axios from "axios";
import { Menu, Icon, Modal, Button } from "antd";
import PlusDM from "./PlusDM";
import PlusChannel from "./PlusChannel";
import "antd/dist/antd.css";

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
      visibleCN: false,
      visibleDN: false,
      newName: "",
    };
    this.handleOkCN = this.handleOkCN.bind(this);
    this.handleStateCN = this.handleStateCN.bind(this);
  }

  // lifeCycle
  componentDidMount() {}

  // 채널명을 적어서 서버에 보내자
  handleStateCN = item => {
    this.setState(() => {
      this.setState({ newName: item });
    });
  };

  // 모달 메소드 (showModal, handleOk, handleCancel)
  showModalCN = () => {
    this.setState({
      visibleCN: true,
    });
  };

  showModalDM = () => {
    this.setState({
      visibleDM: true,
    });
  };

  // 채널생성 OK
  handleOkCN = e => {
    this.setState({
      visibleCN: false,
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
                this.showModalCN(e);
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
          <div style={{ marginTop: "10%", marginBottom: "7%" }}>
            Dm{" "}
            <Icon
              type="plus-circle"
              style={{ marginLeft: "3%" }}
              onClick={e => {
                this.showModalDM(e);
              }}
            />
          </div>

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
          visible={this.state.visibleCN}
          onOk={() => {
            this.handleOkCN();
          }}
          onCancel={this.handleCancel}
        >
          <PlusChannel
            handleOkCN={this.handleOkCN}
            handleState={this.handleStateCN}
          />
        </Modal>

        {/* DM 생성 모달 */}
        <Modal
          title="Create DM"
          visible={this.state.visibleDM}
          onOk={() => {
            this.handleOkDM();
          }}
          onCancel={this.handleCancel}
        >
          <PlusDM
            handleOkDM={this.handleOkDM}
            handleState={this.handleStateDM}
          />
        </Modal>
      </div>
    );
  }
}

export default Side;
