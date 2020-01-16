import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Row, Col } from "antd";
import Signin from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import MainPage from "./pages/Main";
import MyWorkSpace from "./pages/workspace/MyWorkSpace";
import AllWorkSpace from "./pages/workspace/AllWorkSpace";

import "antd/dist/antd.css";
import axios from "axios";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: true,
      userInfo: { user_id: 1, name: "hello", email: "hello@gmail.com" },
      currentWorkspace: null,
      workSpaceList: [],
    };
    this.userLogin = this.userLogin.bind(this);
    this.handleClickMyWS = this.handleClickMyWS.bind(this);
    this.updateCurrentWS = this.updateCurrentWS.bind(this);
  }

  async userLogin() {
    console.log("로그인되었습니다.");
    try {
      const res = await axios.get(
        process.env.REACT_APP_DEV_URL + "/workspace/list/my",
        {
          withCredentials: true,
        },
      );
      console.log("from server res =", res);
      this.setState({
        isLogin: true,
        workSpaceList: res,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleClickMyWS(e) {
    const workSpaceId = e.target.id;
    const clickedWorkspace = this.state.workSpaceList.filter(
      ws => ws.id === workSpaceId,
    );
    this.setState({ currentWorkspace: clickedWorkspace });
  }

  updateCurrentWS(code) {
    const joinedWorkspace = this.state.workSpaceList.filter(
      ws => ws.code === code,
    );
    this.setState({ currentWorkspace: joinedWorkspace });
  }

  render() {
    const { isLogin, currentWorkspace, userInfo, workSpaceList } = this.state;
    const { handleClickMyWS, updateCurrentWS } = this;
    return isLogin && currentWorkspace ? (
      <div> Main.js </div>
    ) : (
      <div className="App">
        최상위 컴포넌트
        <Link to="/signin">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/workspace">워크스페이스</Link>
        <Link to="/main">main page</Link>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/workspace" />;
              }
              return <Redirect to="/" />;
            }}
          />
          <Route
            path="/signin"
            render={() => <Signin userLogin={this.userLogin} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
          <Route
            path="/workspace"
            render={() => (
              <div>
                <Row>
                  <Col span={12}>
                    <MyWorkSpace
                      isLogin={isLogin}
                      userInfo={userInfo}
                      workSpaceList={workSpaceList}
                      handleClickMyWS={handleClickMyWS}
                    />
                  </Col>
                  <Col span={12}>
                    <AllWorkSpace
                      isLogin={isLogin}
                      userInfo={userInfo}
                      updateCurrentWS={updateCurrentWS}
                    />
                  </Col>
                </Row>
                <Row>create workspace</Row>
              </div>
            )}
          />
          <Route
            path="/main"
            render={() => (
              <MainPage
                isLogin={isLogin}
                userInfo={userInfo}
                workSpaceList={workSpaceList}
                currentWorkspace={currentWorkspace}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
