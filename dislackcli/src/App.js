import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Button } from "antd";
import Signin from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      workSpace: null,
      userInfo: {},
    };
    this.userLogin = this.userLogin.bind(this);
  }

  userLogin() {
    console.log("로그인되었습니다.");
    this.setState({ isLogin: true });
    console.log(this.state);
    // 서버에 요청을 해서 userinfo에 데이터전달
    // axios
    //   .get("http://localhost:4000/user", {
    //     withCredentials: true, // 쿠키가 전달이 된다.
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ userinfo: res.data });
    //   });
  }

  render() {
    const { isLogin, workSpace } = this.state;
    return isLogin && workSpace ? (
      <div> Main.js </div>
    ) : (
      <div className="App">
        최상위 컴포넌트
        <Link to="/signin">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/workspace">워크스페이스</Link>
        <Switch>
          <Route exact path="/" />
          <Route
            path="/signin"
            render={() => <Signin userLogin={this.userLogin} />}
          />
          <Route path="/signup" render={() => <SignUp />} />
          <Route path="/workspace" />
        </Switch>
      </div>
    );
  }
}
export default App;
