import React from "react";
import { Popover, Icon, Input } from "antd";
import axios from "axios";
import "./SiderHeader.css";

class SiderHeader extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  // 로그아웃
  logOut = () => {
    axios
      .post(`${process.env.REACT_APP_DEV_URL}/user/signout`, null, {
        withCredentials: true,
      })
      .then(res => {
        if (res.status === 205) {
          this.props.handleLogout();
        }
      })
      .catch(err => {
        console.log(err);
        if (err) {
          localStorage.setItem("isLogin", null);
          // this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        }
        console.log(err);
      });
  };

  render() {
    const { currentWorkspace, userInfo } = this.props.props;
    return (
      <div className="SiderHeader-container">
        <div>
          <Popover
            className="SiderHeader-Pop"
            placement="bottom"
            content={<a onClick={this.logOut}>logout</a>}
            trigger="click"
          >
            {currentWorkspace[0].name}
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
