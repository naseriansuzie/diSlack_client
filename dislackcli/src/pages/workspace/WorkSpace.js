import React from "react";
import "../../App.css";
import { Row, Col } from "antd";
import MyWorkSpace from "./MyWorkSpace";
import AllWorkSpace from "./AllWorkSpace";
import CreateWorkSpace from "./createWorkSpace";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import "./workspace.css";

class WorkSpace extends React.Component {
  constructor(props) {
    super(props);
    console.log("워크스페이스_프롭스 : ", this.props, this.state);
    this.state = {
      workSpaceList: [],
      currentWorkspace: this.props.currentWorkspace,
    };
    this.updateWorkspace = this.updateWorkspace.bind(this);
    this.getWorkSpace = this.getWorkSpace.bind(this);
    this.handleClickMyWS = this.handleClickMyWS.bind(this);
  }

  // lifeCycle
  componentDidMount() {
    if (this.props.isLogin) {
      this.getWorkSpace();
    }
  }

  // methods
  getWorkSpace() {
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/workspace/list/my`, {
        withCredentials: true,
      })
      .then(res => {
        this.setState({ workSpaceList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClickMyWS(e) {
    const workSpaceId = e.target.id;
    const clickedWorkspace = this.state.workSpaceList.filter(
      ws => ws.id === Number(workSpaceId),
    );
    this.props.updateCurrentWorkspace(clickedWorkspace);
  }

  updateWorkspace(workSpace) {
    this.setState({ workSpaceList: [...this.state.workSpaceList, workSpace] });
  }

  render() {
    const {
      isLogin,
      userInfo,
      handleLogout,
      updateCurrentWorkspace,
    } = this.props;
    const { workSpaceList } = this.state;
    // return workSpaceList.length ? (
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
            <div></div>
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
          />
        </div>
      </div>
    );
    // : (
    //   <div>WorkSpace is Loading..</div>
    // );
  }
}

export default WorkSpace;
