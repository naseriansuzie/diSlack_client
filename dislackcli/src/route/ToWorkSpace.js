// 여기는 class 형으로 워크스페이스리스트를 마운트 시 불러옴
import React from "react";
import "../App.css";
import { Route } from "react-router-dom";

import Signin from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import WorkSpace from "../pages/workspace/WorkSpace";
import "antd/dist/antd.css";
import Home from "../components/Home";
import Link from "../components/Link";
import "../components/Home.css";

class ToWorkSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isLogin,
      userInfo,
      updateWorkspace,
      handleLogin,
      handleLogout,
      updateCurrentWorkspace,
      updateUserInfo,
    } = this.props;
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
          exact
          path="/link/:code"
          render={props => (
            <div>
              <Link {...props} isLogin={isLogin} />
            </div>
          )}
        />
        <Route
          path="/signin"
          render={props => (
            <div>
              <Signin
                {...props}
                isLogin={isLogin}
                updateUserInfo={(item, email) => updateUserInfo(item, email)}
                handleLogin={handleLogin}
              />
            </div>
          )}
        />
        <Route path="/signup" render={() => <SignUp isLogin={isLogin} />} />
        <Route
          path="/workspace"
          render={() => (
            <div>
              <WorkSpace
                handleLogout={handleLogout}
                isLogin={isLogin}
                userInfo={userInfo}
                updateWorkspace={updateWorkspace}
                updateCurrentWorkspace={updateCurrentWorkspace}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default ToWorkSpace;
