import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import axios from "axios";
import Signin from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import MainPage from "./pages/Main";
import MyWorkSpace from "./pages/workspace/MyWorkSpace";
import AllWorkSpace from "./pages/workspace/AllWorkSpace";
import CreateWorkSpace from "./pages/workspace/createWorkSpace";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
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
        `${process.env.REACT_APP_DEV_URL}/workspace/list/my`,
        {
          withCredentials: true,
        },
      );
      console.log("from server res =", res.data);
      this.setState({
        isLogin: true,
        workSpaceList: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleClickMyWS(e) {
    const workSpaceId = e.target.id;
    console.log("워크스페이스아이디", workSpaceId);
    console.log("전체워크스페이스",this.state.workSpaceList)
    const clickedWorkspace = this.state.workSpaceList.filter(
      ws => {
        console.log("WS? :",ws)
        return ws.id === Number(workSpaceId)},
    );
    console.log("선택한 워크스페이스", clickedWorkspace);
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
    console.log("현재웤스", currentWorkspace);
    return isLogin && currentWorkspace ? (
      <div />
    ) : (
      // <div> <Redirect to='/main/코드내용'/> </div>
      <div className="App">
        최상위 컴포넌트
        {this.state.isLogin ? null : <Link to="/signin">로그인</Link>}
        {this.state.isLogin ? null : <Link to="/signup">회원가입</Link>}
        <Link to="/workspace">워크스페이스</Link>
        <Link to="/main">main page</Link>
        {this.state.isLogin ? (
          <Button
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
          </Button>
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
            path="/main/onWFDurn"
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
