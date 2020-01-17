import React from "react";
import { Input, Card, Button, Form } from "antd";
import axios from "axios";

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
      <Card style={{ width: 300 }}>
        <div>Create Your Work Space</div>
        <Input
          placeholder="Create WorkSpace"
          onKeyPress={e => {
            this.clickEnter(e);
          }}
        />
        <Button
          onClick={this.createWS}
          type="primary"
          style={{ marginTop: "5%", width: "100%" }}
        >
          Create
        </Button>
      </Card>
    );
  }
}

export default CreateWorkSpace;
