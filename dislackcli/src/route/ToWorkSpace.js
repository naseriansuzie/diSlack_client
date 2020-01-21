//여기는 class 형으로 워크스페이스리스트를 마운트 시 불러옴
import React from "react";
import "../App.css";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import Signin from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import MyWorkSpace from "../pages/workspace/MyWorkSpace";
import AllWorkSpace from "../pages/workspace/AllWorkSpace";
import CreateWorkSpace from "../pages/workspace/createWorkSpace";
import "antd/dist/antd.css";
import Home from "../components/Home";
import "../components/Home.css";

class ToWorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = { workSpaceList: this.props.workSpaceList };
  }

  render() {
    const {
      isLogin,
      userInfo,
      workSpaceList,
      handleClickMyWS,
      updateWorkspace,
      handleLogin,
      handleLogout,
      getWorkSpace,
    } = this.props;
    console.log("렌더가 되나?");
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Home handleLogout={handleLogout} />
            </div>
          )}
        />

        <Route
          path="/signin"
          render={() => {
            console.log("로그인");
            return (
              <div>
                <Signin
                  isLogin={isLogin}
                  getWorkSpace={getWorkSpace}
                  updateUserInfo={(item, email) =>
                    this.updateUserInfo(item, email)
                  }
                  handleLogin={() => {
                    handleLogin();
                  }}
                />
              </div>
            );
          }}
        />
        <Route path="/signup" render={() => <SignUp isLogin={isLogin} />} />
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
                  <CreateWorkSpace getWorkSpace={getWorkSpace} />
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

export default ToWorkSpace;
