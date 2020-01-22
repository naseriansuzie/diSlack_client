import React from "react";
import "../../App.css";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import MyWorkSpace from "./MyWorkSpace";
import AllWorkSpace from "./AllWorkSpace";
import CreateWorkSpace from "./createWorkSpace";
import "antd/dist/antd.css";
import axios from "axios";
import "./workspace.css";

class WorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickMyWS = this.handleClickMyWS.bind(this);
  }

  // methods
  handleClickMyWS(e) {
    const workSpaceId = e.target.id;
    console.log(
      "클릭한 메시지 아이디 =",
      workSpaceId,
      "프롭스로 받은 워크스페이스리스트 =",
      this.props.workSpaceList,
    );
    const clickedWorkspace = this.props.workSpaceList.filter(
      ws => ws.id === Number(workSpaceId),
    );
    this.props.updateCurrentWorkspace(clickedWorkspace);
  }

  // lifeCycle
  componentDidMount() {
    if (this.props.isLogin) {
      this.props.getWorkSpace();
    }
  }

  render() {
    const {
      isLogin,
      userInfo,
      handleLogout,
      updateCurrentWorkspace,
      workSpaceList,
      getWorkSpace,
      updateWorkspace,
    } = this.props;

    return (
      <div className="workspace-main">
        <div className="workspace-left">
          <div className="workspace-header">
            <Link className="workspace-header-title" to="/">
              Crong
            </Link>
          </div>
          <div className="workspace-middle">
            <CreateWorkSpace getWorkSpace={this.getWorkSpace} />
            <div />
          </div>
        </div>

        <div className="workspace-right">
          <MyWorkSpace
            handleLogout={handleLogout}
            isLogin={isLogin}
            userInfo={userInfo}
            workSpaceList={workSpaceList}
            handleClickMyWS={this.handleClickMyWS}
          />
          <AllWorkSpace
            isLogin={isLogin}
            userInfo={userInfo}
            workSpaceList={workSpaceList}
            updateCurrentWorkspace={updateCurrentWorkspace}
            updateWorkspace={updateWorkspace}
            getWorkSpace={getWorkSpace}
          />
        </div>
      </div>
    );
  }
}

export default WorkSpace;
