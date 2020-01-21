import React from "react";
import "../App.css";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Row, Col } from "antd";
import Signin from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import MainPage from "../pages/Main";
import MyWorkSpace from "../pages/workspace/MyWorkSpace";
import AllWorkSpace from "../pages/workspace/AllWorkSpace";
import CreateWorkSpace from "../pages/workspace/createWorkSpace";
import "antd/dist/antd.css";
import Home from "../components/Home";
import "../components/Home.css";

export default function Tomain(props) {
  const {
    isLogin,
    currentWorkspace,
    userInfo,
    workSpaceList,
    handleClickMyWS,
    updateWorkspace,
    handleLogin,
    handleLogout,
    getWorkSpace,
  } = props;
  return (
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
              isLogin={isLogin}
              handleLogin={() => {
                handleLogin();
              }}
            />
          )}
        />
        <Route path="/signup" render={() => <SignUp isLogin={isLogin} />} />
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
                    handleLogout={handleLogout}
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
        <Route
          path={currentWorkspace ? `/main/${currentWorkspace[0].code}` : "/"}
          render={() => (
            <MainPage
              className="MainPage"
              isLogin={isLogin}
              userInfo={userInfo}
              workSpaceList={workSpaceList}
              currentWorkspace={currentWorkspace}
              handleLogout={handleLogout}
            />
          )}
        />
      </Switch>
    </div>
  );
}
