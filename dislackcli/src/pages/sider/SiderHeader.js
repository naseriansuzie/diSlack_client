import React from "react";
import { Popover, Icon, Input } from "antd";
import "./SiderHeader.css";

class SiderHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  // 로그아웃
  handleLogOut = () => {
    console.log("LOGOUT");
  };

  render() {
    // console.log("싸이더혜떠", this.props, this.state);
    // console.log("현재워크스페이스 ", this.props);
    const { currentWorkspace, userInfo } = this.props.props;
    // console.log(currentWorkspace, userInfo);
    return (
      <div className="SiderHeader-container">
        <div>
          <Popover
            className="SiderHeader-Pop"
            placement="bottom"
            title={["LogOut", this.handleLogOut()]}
            content="content"
            trigger="click"
          >
            {currentWorkspace[0].name}{" "}
            <Icon className="SiderHeader-Icon-down" type="down" />
          </Popover>
          <Icon className="SiderHeader-Icon" type="bell" />
        </div>
        <div className="SiderHeader-bottom">
          <Icon
            type="aliwangwang"
            theme="filled"
            style={{ marginLeft: "3%", marginRight: "1%", color: "#2ecc71" }}
          />{" "}
          {userInfo.name}
        </div>
      </div>
    );
  }
}

export default SiderHeader;
