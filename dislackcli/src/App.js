import React from "react";
import "./App.css";
import axios from "axios";
import ToMain from "./route/ToMain";
// import ToWorkSpace from "./route/ToWorkSpace";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      userInfo: this.props.userInfo,
      currentWorkspace: null,
      currentURL: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateCurrentWorkspace = this.updateCurrentWorkspace.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.getWorkSpace = this.getWorkSpace.bind(this);
    this.updateWorkspace = this.updateWorkspace.bind(this);
    this.setCurrentURL = this.setCurrentURL.bind(this);
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
    console.log("실행되니?", clickedWorkspace);
    this.setState({
      currentWorkspace: clickedWorkspace,
    });
  }

  getWorkSpace() {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/workspace/list/my`, {
        withCredentials: true,
      })
      .then(res => {
        this.setState({ workSpaceList: res.data });
      })
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        } else console.log(err);
      });
  }

  updateWorkspace(workSpace) {
    this.setState({ workSpaceList: [...this.state.workSpaceList, workSpace] });
  }

  setCurrentURL(code) {
    this.setState({ currentURL: code });
  }

  // lifeCycle
  async componentDidMount() {
    try {
      await axios.post(`${process.env.REACT_APP_DEV_URL}/verify`, null, {
        withCredentials: true,
      });
    } catch (err) {
      if (err.response && err.response.status === 419) {
        localStorage.setItem("isLogin", null);
        this.setState({ isLogin: false });
        alert("다시 로그인 해주세요");
        window.location = "/signin";
      } else console.log(err);
    }

    await this.getWorkSpace();
    console.log(
      "겟 워크스페이스 이후 워크스페이스리스트",
      this.state.workSpaceList,
    );
    if (this.state.workSpaceList) {
      let result = this.state.workSpaceList.filter(
        val => val.code === this.state.currentURL,
      );
      console.log("url로 찾은 객체", result);
      this.updateCurrentWorkspace(result);
    }
  }

  render() {
    const {
      isLogin,
      currentWorkspace,
      userInfo,
      workSpaceList,
      currentURL,
    } = this.state;
    const {
      updateCurrentWorkspace,
      handleLogin,
      handleLogout,
      getWorkSpace,
      updateWorkspace,
      setCurrentURL,
    } = this;

    //return isLogin ? (
    return (
      <div>
        <ToMain
          isLogin={isLogin}
          currentWorkspace={currentWorkspace}
          userInfo={userInfo}
          updateCurrentWorkspace={updateCurrentWorkspace}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          getWorkSpace={getWorkSpace}
          updateWorkspace={updateWorkspace}
          workSpaceList={workSpaceList}
          setCurrentURL={setCurrentURL}
          currentURL={currentURL}
        />
      </div>
    );
    // ) : (
    //   <div className="App">
    //     <ToWorkSpace
    //       isLogin={isLogin}
    //       currentWorkspace={currentWorkspace}
    //       userInfo={userInfo}
    //       updateCurrentWorkspace={updateCurrentWorkspace}
    //       handleLogin={handleLogin}
    //       handleLogout={handleLogout}
    //       updateUserInfo={updateUserInfo}
    //       getWorkSpace={getWorkSpace}
    //       updateWorkspace={updateWorkspace}
    //       workSpaceList={workSpaceList}
    //     />
    //   </div>
    // );
  }
}
export default App;
