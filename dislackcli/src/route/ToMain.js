import React from "react";
import "../App.css";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import Signin from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import MainPage from "../pages/Main";
import WorkSpace from "../pages/workspace/WorkSpace";
import "antd/dist/antd.css";
import Home from "../components/Home";
import "../components/Home.css";

export default function ToMain(props) {
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
    updateCurrentWorkspace,
    setCurrentURL,
    currentURL,
  } = props;
  console.log("여기는 tomain");
  return (
    <div>
      {/* <Redirect
        to={currentWorkspace ? `/main/${currentWorkspace[0].code}` : "/"}
      /> */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            // if (isLogin) {
            //   return <Redirect to="/workspace" />;
            // }
            return <Home handleLogout={handleLogout} />;
            //}
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
              <div>
                <WorkSpace
                  currentWorkspace={currentWorkspace}
                  handleLogout={handleLogout}
                  isLogin={isLogin}
                  userInfo={userInfo}
                  workSpaceList={workSpaceList}
                  handleClickMyWS={handleClickMyWS}
                  updateWorkspace={updateWorkspace}
                  getWorkSpace={getWorkSpace}
                  updateCurrentWorkspace={updateCurrentWorkspace}
                />
              </div>
            </div>
          )}
        />
        <Route
          path={currentWorkspace ? `/main/${currentWorkspace[0].code}` : "/"}
          render={history => {
            console.log("이주소?");
            console.log(props.workSpaceList);
            return (
              <MainPage
                className="MainPage"
                isLogin={isLogin}
                userInfo={userInfo}
                workSpaceList={workSpaceList}
                currentWorkspace={currentWorkspace}
                handleLogout={handleLogout}
                updateWorkspace={updateWorkspace}
                getWorkSpace={getWorkSpace}
                history={history}
                updateCurrentWorkspace={updateCurrentWorkspace}
                setCurrentURL={setCurrentURL}
                currentURL={currentURL}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}
