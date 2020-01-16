import React from "react";
import { Menu, Icon } from "antd";
import "antd/dist/antd.css";

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "1",
    };
  }

  handleClick = e => {
    console.log("click ", e);
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
          <div style={{ marginTop: "5%", marginBottom: "7%" }}>Chanenl</div>

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
      </div>
    );
  }
}

export default Side;
