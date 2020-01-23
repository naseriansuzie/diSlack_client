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
import LinkCode from "../components/Link";

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
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home isLogin={isLogin} handleLogout={handleLogout} />}
        />
        <Route
          exact
          path="/link/:code"
          render={props => (
            <div>
              <LinkCode {...props} isLogin={isLogin} />
            </div>
          )}
        />
        <Route
          path="/signin"
          render={props => (
            <Signin
              {...props}
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
          path={
            currentWorkspace && currentWorkspace.length
              ? `/main/${currentWorkspace[0].code}`
              : "/"
          }
          render={history => (
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
          )}
        />
      </Switch>
    </div>
  );
}
