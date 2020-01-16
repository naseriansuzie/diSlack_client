import React from "react";
import { Input, Card, Button, Form } from "antd";
import axios from "axios";

class CreateWorkSpace extends React.Component {
  state = {
    name: "",
  };

  createWS = e => {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
    // const workspaceName = { name: this.state.name };
    // axios
    //   .post(
    //     `${process.env.REACT_APP_DEV_URL}/workspace/create`,
    //     workspaceName,
    //     {
    //       withCredentials: true, // 쿠키전달
    //     },
    //   )
    //   .then(res => {
    //     console.log(this.state);
    //   });
    console.log(this.state);
  };

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
        <Button type="primary" style={{ marginTop: "5%", width: "100%" }}>
          Create
        </Button>
      </Card>
    );
  }
}

export default CreateWorkSpace;
