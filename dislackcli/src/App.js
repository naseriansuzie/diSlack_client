import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Button } from "antd";
import Signin from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import MainPage from "./pages/Main";

import "antd/dist/antd.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      workSpace: [{ id: 1, name: "crong" }],
      userInfo: { user_id: 1, name: "hello", email: "hell@gmail.com" },
    };
  }

  // 로그인 시 isLogin 업데이트 해주는 함수 필요

  // workSpace 리스트 업데이트 해주는 함수 필요

  render() {
    const { isLogin, workSpace, userInfo } = this.state;
    return isLogin && workSpace.length ? (
      <div>
        <Redirect to="main" />
      </div> //일단 이렇게 하고 워크스페이스 선택 ui 나오면 거기로 리다이렉트
    ) : (
      <div className="App">
        최상위 컴포넌트
        <Link to="/signin">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/workspace">워크스페이스</Link>
        <Link to="/main">main page</Link>
        <Switch>
          <Route exact path="/" />
          <Route path="/signin" render={() => <Signin />} />
          <Route path="/signup" render={() => <SignUp />} />
          <Route path="/workspace" />
          <Route
            path="/main"
            render={() => (
              <MainPage
                isLogin={isLogin}
                userInfo={userInfo}
                workSpace={workSpace}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
