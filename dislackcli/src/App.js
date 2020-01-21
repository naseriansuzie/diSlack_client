import React from "react";
import "./App.css";
import axios from "axios";
import ToMain from "./route/ToMain";
import ToWorkSpace from "./route/ToWorkSpace";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      userInfo: this.props.userInfo,
      currentWorkspace: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateCurrentWorkspace = this.updateCurrentWorkspace.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  handleLogin() {
    this.setState({
      isLogin: true,
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
    });
  }

  handleLogout() {
    this.setState({ isLogin: false, userInfo: null });
    alert("로그아웃 되었습니다!");
  }

  updateUserInfo(item, email) {
    const userObj = {
      name: item.name,
      user_id: item.user_id,
      email,
    };
    this.setState({ userInfo: userObj });
  }

  updateCurrentWorkspace(clickedWorkspace) {
    if (this.state.currentWorkspace !== null) {
      this.setState({ currentWorkspace: null });
    }
    this.setState({
      currentWorkspace: clickedWorkspace,
    });
  }

  // lifeCycle
  async componentDidMount() {}

  render() {
    const { isLogin, currentWorkspace, userInfo } = this.state;
    const {
      updateCurrentWorkspace,
      handleLogin,
      handleLogout,
      updateUserInfo,
    } = this;
    // console.log("app.js state의 현재 선택된 워크스페이스", currentWorkspace);
    return isLogin && currentWorkspace ? (
      <div>
        <ToMain
          isLogin={isLogin}
          currentWorkspace={currentWorkspace}
          userInfo={userInfo}
          updateCurrentWorkspace={updateCurrentWorkspace}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </div>
    ) : (
      <div className="App">
        <ToWorkSpace
          isLogin={isLogin}
          currentWorkspace={currentWorkspace}
          userInfo={userInfo}
          updateCurrentWorkspace={updateCurrentWorkspace}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          updateUserInfo={updateUserInfo}
        />
      </div>
    );
  }
}
export default App;
