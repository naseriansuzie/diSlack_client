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
      isLogin: true,
      currentWorkspace: null,
      workSpaceList: [],
      userInfo: {},
    };
    this.userLogin = this.userLogin.bind(this);
  }

  userLogin() {
    console.log("로그인되었습니다.");
    this.setState({ isLogin: true });
    console.log(this.state);
  }

  render() {
    const { isLogin, currentWorkspace } = this.state;
    return isLogin && currentWorkspace ? (
      <div> Main.js </div>
    ) : (
      <div className="App">
        최상위 컴포넌트
        <Link to="/signin">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/workspace">워크스페이스</Link>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/workspace" />;
              }
              return <Redirect to="/sigin" />;
            }}
          />
          <Route
            path="/signin"
            render={() => <Signin userLogin={this.userLogin} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
          <Route path="/workspace" />
          <Route path="/main" render={() => <MainPage />} />
        </Switch>
      </div>
    );
  }
}
export default App;
