import { List, Avatar, Row, Col, Button } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";
import "./allws.css";
import axios from "axios";
class AllWorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.handleJoinWS = this.handleJoinWS.bind(this);
  }

  async handleJoinWS(e) {
    const workSpaceCode = e.target.code;
    try {
      const res = axios.post(
        `${process.env.REACT_APP_DEV_URL}/workspace/join`,
        workSpaceCode,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        this.props.updateCurrentWS(workSpaceCode);
      }
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    //프론트 테스트용 this.setState({ list: [{ id: 1, name: "all1", code: "!@#$%^&" }] });
    axios
      .get(process.env.REACT_APP_DEV_URL + "/workspace/list/all", {
        withCredentials: true,
      })
      .then(res => {
        console.log("from server res =", res);
        this.setState({
          list: res,
        });
      })
      .catch(err => console.log(err));
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
              <Col span={6}></Col>
              <Col span={12}>
                <Row
                  style={{
                    padding: "10px",
                    fontWeight: "bold",
                    fontSize: "2em",
                  }}
                >
                  All Workspace
                </Row>
                <Row style={{ padding: "10px" }}>
                  Choose a Workspace you want to join
                </Row>
                <List
                  itemLayout="horizontal"
                  dataSource={list}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9" />
                        }
                        title={item.name}
                        description={`${process.env.REACT_APP_DEV_URL}/${item.code}`}
                      />
                      <Button id={item.code} onClick={handleJoinWS}>
                        Join
                      </Button>
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={6}></Col>
            </Row>
          </div>
        </Col>
      ) : (
        <div>Loading</div>
      )
    ) : (
      <div>
        <Redirect to="/signin" />
      </div>
    );
  }
}
export default AllWorkSpace;
