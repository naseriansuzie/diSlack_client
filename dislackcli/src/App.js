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
      workSpaceList: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getWorkSpace = this.getWorkSpace.bind(this);
    this.handleClickMyWS = this.handleClickMyWS.bind(this);
    this.updateWorkspace = this.updateWorkspace.bind(this);
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

  async getWorkSpace() {
    console.log("로그인되었습니다.");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DEV_URL}/workspace/list/my`,
        {
          withCredentials: true,
        },
      );
      console.log("로그인 후 내 워크스페이스 불러오기", res.data);
      this.setState({
        isLogin: true,
        workSpaceList: res.data,
      });
    } catch (err) {
      console.log("새로고침에러1");
      console.log(err);
    }
  }

  updateUserInfo(item, email) {
    const userObj = {
      name: item.name,
      user_id: item.user_id,
      email,
    };
    this.setState({ userInfo: userObj });
  }

  handleClickMyWS(e) {
    const workSpaceId = e.target.id;
    const clickedWorkspace = this.state.workSpaceList.filter(
      ws => ws.id === Number(workSpaceId),
    );
    this.setState({
      currentWorkspace: clickedWorkspace,
    });
  }

  async updateWorkspace() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DEV_URL}/workspace/list/my`,
        {
          withCredentials: true,
        },
      );
      console.log("마이 워크스페이스 업데이트", res.data);
      this.setState({
        workSpaceList: res.data,
      });
    } catch (err) {
      console.log("새로고침에러2");
      console.log(err);
    }
  }

  //lifeCycle
  async componentDidMount() {
    if (this.state.isLogin) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DEV_URL}/workspace/list/my`,
          {
            withCredentials: true,
          },
        );
        console.log("로그인 후 내 워크스페이스 불러오기", res.data);
        this.setState({
          workSpaceList: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  componentWillUnmount() {
    localStorage.setItem("isLogin", null);
  }
  render() {
    const { isLogin, currentWorkspace, userInfo, workSpaceList } = this.state;
    const {
      handleClickMyWS,
      updateWorkspace,
      handleLogin,
      handleLogout,
      getWorkSpace,
      updateUserInfo,
    } = this;
    // console.log("app.js state의 현재 선택된 워크스페이스", currentWorkspace);
    return isLogin ? (
      <div>
        <ToMain
          isLogin={isLogin}
          currentWorkspace={currentWorkspace}
          userInfo={userInfo}
          workSpaceList={workSpaceList}
          handleClickMyWS={handleClickMyWS}
          updateWorkspace={updateWorkspace}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          getWorkSpace={getWorkSpace}
        />
      </div>
    ) : (
      <div className="App">
        <ToWorkSpace
          isLogin={isLogin}
          currentWorkspace={currentWorkspace}
          userInfo={userInfo}
          workSpaceList={workSpaceList}
          handleClickMyWS={handleClickMyWS}
          updateWorkspace={updateWorkspace}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          getWorkSpace={getWorkSpace}
          updateUserInfo={updateUserInfo}
        />
      </div>
    );
  }
}
export default App;
