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
      userInfo: null,
      currentWorkspace: null,
      workSpaceList: [],
    };
    this.getWorkSpace = this.getWorkSpace.bind(this);
    this.handleClickMyWS = this.handleClickMyWS.bind(this);
    this.updateWorkspace = this.updateWorkspace.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
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
      console.log(err);
    }
  }

  render() {
    const { isLogin, currentWorkspace, userInfo, workSpaceList } = this.state;
    const { handleClickMyWS, updateWorkspace } = this;
    console.log("app.js state의 현재 선택된 워크스페이스", currentWorkspace);
    return isLogin && currentWorkspace ? (
      <div>
        <Redirect to={`/main/${currentWorkspace[0].code}`} />
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
              <Signin
                isLogin={this.state.isLogin}
                getWorkSpace={this.getWorkSpace}
              />
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
                      workSpaceList={workSpaceList}
                      updateWorkspace={updateWorkspace}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20%" }}>
                  <Col span={8} />
                  <Col span={8}>
                    <CreateWorkSpace getWorkSpace={this.getWorkSpace} />
                  </Col>
                  <Col span={8} />
                </Row>
              </div>
            )}
          />
          <Route
            path={currentWorkspace ? `/main/${currentWorkspace[0].code}` : "/"}
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
    ) : (
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
                  console.log("로그아웃 결과", result);
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
              <Signin
                isLogin={this.state.isLogin}
                getWorkSpace={this.getWorkSpace}
                updateUserInfo={this.updateUserInfo}
              />
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
                      workSpaceList={workSpaceList}
                      updateWorkspace={updateWorkspace}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20%" }}>
                  <Col span={8} />
                  <Col span={8}>
                    <CreateWorkSpace getWorkSpace={this.getWorkSpace} />
                  </Col>
                  <Col span={8} />
                </Row>
              </div>
            )}
          />
          <Route
            path={currentWorkspace ? `/main/tsa4hg5C` : "/"}
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
