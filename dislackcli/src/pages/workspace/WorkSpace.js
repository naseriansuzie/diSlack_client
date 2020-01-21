import React from "react";
import "../../App.css";
import { Row, Col } from "antd";
import MyWorkSpace from "./MyWorkSpace";
import AllWorkSpace from "./AllWorkSpace";
import CreateWorkSpace from "./createWorkSpace";
import "antd/dist/antd.css";
import axios from "axios";

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
  async componentDidMount() {
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
    return workSpaceList.length ? (
      <div>
        <Row>
          <Col span={12}>
            <MyWorkSpace
              handleLogout={handleLogout}
              isLogin={isLogin}
              userInfo={userInfo}
              workSpaceList={workSpaceList}
              handleClickMyWS={this.handleClickMyWS}
            />
          </Col>
          <Col span={12}>
            <AllWorkSpace
              isLogin={isLogin}
              userInfo={userInfo}
              workSpaceList={workSpaceList}
              updateCurrentWorkspace={updateCurrentWorkspace}
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
    ) : (
      <div>WorkSpace is Loading..</div>
    );
  }
}

export default WorkSpace;
