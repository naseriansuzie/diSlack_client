import React from "react";
import { Input, Card, Button, Form } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import "./createWorkspace.css";

class CreateWorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  async createWS(e) {
    await this.setState({ name: e.target.value });
    const workspaceName = { name: this.state.name };
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/workspace/create`,
        workspaceName,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        alert("워크스페이스가 생성되었습니다.");
        this.props.getWorkSpace();
      })
      .catch(err => {
        if (err.response.status === 409) {
          alert(
            "동일한 이름의 워크스페이스가 존재합니다. 새로운 이름으로 만들어주세요!",
          );
        } else console.log(err);
      });
  }

  clearInput = input => {
    input.target.value = "";
    console.log(input.target.value);
    // alert("워크스페이스가 생성되었습니다.");
  };

  clickEnter = e => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        this.createWS(e);
      }
    }
  };

  render() {
    return (
      <div className="workspace-create-main">
        <Card className="workspace-create-form">
          <div className="workspace-create-title">Create your workspace</div>
          <div className="workspace-create-title-1">
            Just one more workspace — a quick confirmation — before you say
            goodbye to overstuffed inboxes for good.
          </div>
          <div className="workspace-create-title-2">Your workspace name</div>
          <Input
            className="workspace-input"
            placeholder="Create WorkSpace"
            onKeyPress={e => {
              this.clickEnter(e);
            }}
          />
          <Button
            className="workspace-createBtn"
            type="primary"
            style={{ marginTop: "5%", width: "100%" }}
          >
            Create
          </Button>
        </Card>
      </div>
    );
  }
}

export default CreateWorkSpace;
