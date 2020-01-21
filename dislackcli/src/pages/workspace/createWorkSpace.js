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
    // console.log(e.target.value);
    await this.setState({ name: e.target.value });
    const workspaceName = { name: this.state.name };
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/workspace/create`,
        workspaceName,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        alert("워크스페이스가 생성되었습니다.");
        this.props.getWorkSpace();
      })
      .catch(err => {
        console.log("에러에용?", err);
        alert("동일한 이름이 있습니다!");
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
