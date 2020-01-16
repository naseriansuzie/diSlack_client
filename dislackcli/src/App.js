import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Row, Col } from "antd";
import Signin from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import MainPage from "./pages/Main";
import axios from "axios";
import MyWorkSpace from "./pages/workspace/MyWorkSpace";

import "antd/dist/antd.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
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
        {this.state.isLogin ? null : <Link to="/signin">로그인</Link>}
        {this.state.isLogin ? null : <Link to="/signup">회원가입</Link>}
        <Link to="/workspace">워크스페이스</Link>
        <Link to="/main">main page</Link>
        {this.state.isLogin ? (
          <button
            onClick={() => {
              axios
                .post(`${process.env.REACT_APP_DEV_URL}/user/signout`, null, {
                  withCredentials: true,
                })
                .then(result => {
                  console.log(result);
                  this.setState({ isLogin: false });
                })
                .catch(err => {
                  console.log(err);
                });
            }}
          >
            로그아웃
          </button>
        ) : null}
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
            render={() => (
              <Signin isLogin={this.state.isLogin} userLogin={this.userLogin} />
            )}
          />
          <Route
            path="/signup"
            render={() => <SignUp isLogin={this.state.isLogin} />}
          />
          <Route
            path="/workspace"
            render={() => (
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
