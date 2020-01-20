import React from "react";
import "./App.css";
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
import Home from "./components/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
      userInfo: this.props.userInfo,
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

  render() {
    const { isLogin, currentWorkspace, userInfo, workSpaceList } = this.state;
    const { handleClickMyWS, updateWorkspace } = this;
    // console.log("app.js state의 현재 선택된 워크스페이스", currentWorkspace);
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
              return <Home />;
            }}
          />
          <Route
            path="/signin"
            render={() => (
              <Signin
                isLogin={this.state.isLogin}
                handleLogin={() => {
                  this.setState({
                    isLogin: true,
                    userInfo: JSON.parse(localStorage.getItem("userInfo")),
                  });
                }}
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
                <div className="appWs-header">
                  <div className="appWs-header-1">
                    <Link className="appWs-header-1-1" to="/">
                      Crong
                    </Link>
                  </div>
                  <div className="appWs-header-2">
                    <Link to="/workspace">Find your workspace</Link>
                    <Link to="/signin">Sign in</Link>
                  </div>
                </div>
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
                className="MainPage"
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
        <Route
          exact
          path="/"
          render={() => (
            <Home
              handleLogout={() => {
                this.setState({ isLogin: false, userInfo: null });
                alert("로그아웃 되었습니다!");
              }}
            />
          )}
        />

        <Route
          path="/signin"
          render={() => (
            <Signin
              isLogin={this.state.isLogin}
              getWorkSpace={this.getWorkSpace}
              updateUserInfo={this.updateUserInfo}
              handleLogin={() => {
                this.setState({
                  isLogin: true,
                  userInfo: JSON.parse(localStorage.getItem("userInfo")),
                });
              }}
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
      </div>
    );
  }
}
export default App;
