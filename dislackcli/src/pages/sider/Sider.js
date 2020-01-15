import React from "react";
// import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Menu, Switch } from "antd";
// import "./sider.css";
import "antd/dist/antd.css";

class Side extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: "dark",
      current: "1",
    };
  }

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light",
    });
  };

  render() {
    const { theme, current } = this.state;
    return (
      <div style={{ height: "100%" }}>
        {/* <Switch
          checked={theme === "dark"}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /> */}
        {/* <br /> */}
        {/* <br /> */}
        <Menu
          theme={theme}
          onClick={this.handleClick}
          style={{ width: "100%", height: "100%" }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
        >
          <div>Chanenl</div>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <div>Dm</div>
        </Menu>
      </div>
    );
  }
}

export default Side;
