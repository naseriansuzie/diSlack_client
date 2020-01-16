import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Row, Col } from "antd";
import Signin from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import MainPage from "./pages/Main";
import MyWorkSpace from "./pages/workspace/MyWorkSpace";
import CreateWorkSpace from "./pages/workspace/createWorkSpace";

import "antd/dist/antd.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: true,
      userInfo: { user_id: 1, name: "hello", email: "hello@gmail.com" },
      currentWorkspace: null,
      workSpaceList: [
        { id: 1, name: "crong1", code: "!@#$%" },
        { id: 2, name: "crong2", code: "QWER" },
      ],
    };
    this.userLogin = this.userLogin.bind(this);
  }

  userLogin() {
    console.log("로그인되었습니다.");
    this.setState({ isLogin: true });
    console.log(this.state);
  }

  // 로그인 시 isLogin 업데이트 해주는 함수 필요
  // workSpace 리스트 업데이트 해주는 함수 필요

  render() {
    const { isLogin, currentWorkspace, userInfo, workSpaceList } = this.state;
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
                    />
                  </Col>
                  <Col span={12}>
                    <MyWorkSpace isLogin={isLogin} userInfo={userInfo} />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20%" }}>
                  <Col span={8} />
                  <Col span={8}>
                    <CreateWorkSpace />
                  </Col>
                  <Col span={8} />
                </Row>
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
