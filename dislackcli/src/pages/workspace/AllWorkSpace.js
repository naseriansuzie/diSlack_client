import { List, Avatar, Row, Col, Button } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";
import "./allws.css";
import axios from "axios";

class AllWorkSpace extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.handleJoinWS = this.handleJoinWS.bind(this);
  }

  async handleJoinWS(e) {
    const workSpaceCode = e.target.id;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/workspace/join`,
        { code: workSpaceCode },
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        // App.js에 currentDisplay를 바꿔야 하는데 지금 현재 wsID로 찾아야 된다.
        const joinWorkSpace = this.state.list;
        const result = joinWorkSpace.filter(ws => ws.code === workSpaceCode);
        this.props.updateCurrentWorkspace(result);
      }
      // 구조 상 문제 때문에 안됨..?
      // let myWorkSpaceCodes = await this.props.workSpaceList.map(ws => ws.code);
      // console.log("조인한 후 내 워크스페이스 코드들 = ", myWorkSpaceCodes);
      // let filteredList = await this.state.list.filter(
      //   ws => !myWorkSpaceCodes.includes(ws.code),
      // );
      // console.log("내가 가입하지 않은 워크스페이스들 = ", filteredList);
      // this.setState({ list: filteredList });
    } catch (err) {
      if (err.response.status === 419) {
        localStorage.setItem("isLogin", null);
        this.setState({ isLogin: false });
        alert("다시 로그인 해주세요");
        window.location = "/signin";
      }
    }
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${process.env.REACT_APP_DEV_URL}/workspace/list/all`, {
        withCredentials: true,
      })
      .then(res => {
        // console.log("마운트하면서 전체 워크스페이스리스트 =", res);
        // console.log(this.props.workSpaceList);
        const myList = this.props.workSpaceList.map(myWs => myWs.id);
        // console.log("myList =", myList);
        res.data = res.data.filter(ws => !myList.includes(ws.id));
        // console.log("res.data =", res.data);
        this.setState({
          list: res.data,
        });
      })
      .catch(err => {
        // if (err.response.status === 419) {
        //   localStorage.setItem("isLogin", null);
        //   this.setState({ isLogin: false });
        //   alert("다시 로그인 해주세요");
        //   window.location = "/signin";
        // }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isLogin } = this.props;
    const { list } = this.state;
    const { handleJoinWS } = this;
    return isLogin ? (
      list.length ? (
        <Col>
          <div>
            <Row
              className="scrollY"
              style={{ height: "600px", overFlow: "scroll" }}
            >
              <Col span={6} />
              <Col span={12}>
                <Row className="workspace-listTitle">Other Workspace</Row>
                <Row>Choose a Workspace you want to join</Row>
                <List
                  className="workspace-list"
                  itemLayout="horizontal"
                  dataSource={list}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        className="ss"
                        avatar={
                          <Avatar src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9" />
                        }
                        title={item.name}
                        description={`${process.env.REACT_APP_DEV_URL}/${item.code}`}
                      />

                      <Button
                        className="workspace-joinBtn"
                        id={item.code}
                        onClick={handleJoinWS}
                      >
                        Join
                      </Button>
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={6} />
            </Row>
          </div>
        </Col>
      ) : (
        <div>
          {" "}
          <Row
            style={{
              padding: "10px",
              fontWeight: "bold",
              fontSize: "2em",
            }}
          >
            Other Workspace
          </Row>
          <Row style={{ padding: "10px" }}>There is no other workspace.</Row>
        </div>
      )
    ) : (
      <div>
        <Redirect to="/signin" />
      </div>
    );
  }
}
export default AllWorkSpace;
