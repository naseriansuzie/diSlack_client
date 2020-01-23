import React from "react";
import { Input, Form } from "antd";
import axios from "axios";

class InputMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.deleteInput = this.deleteInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterClick = this.enterClick.bind(this);
    this.changeInputVal = this.changeInputVal.bind(this);
  }

  deleteInput = e => {
    console.log(e);
  };

  changeInputVal(e) {
    const input = e.target.value;
    console.log(input);
    this.setState({ message: input });
  }

  async handleChange(e) {
    const address = this.props.currentDisplay.name
      ? "channelmessage"
      : "directmessage";
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${this.props.props.currentWorkspace[0].code}/${address}/${this.props.currentDisplay.id}`,
        { message: this.state.message },
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        this.setState({ message: "" });
      })
      .catch(err => {
        if (err.response && err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
          window.location = "/signin";
        } else console.log(err);
      });
  }

  enterClick = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value !== "") {
        this.handleChange(e);
      }
    }
  };

  render() {
    // console.log("인풋메시지_프롭스", this.props);
    return (
      <div style={{ margin: "1%" }}>
        <Form style={{ height: "50px" }}>
          <Input
            className="input_msg"
            placeholder="Message"
            value={this.state.message}
            style={{ height: "100%" }}
            type="text"
            onChange={this.changeInputVal}
            onKeyPress={async e => {
              await this.enterClick(e);
            }}
          />
        </Form>
      </div>
    );
  }
}
export default InputMsg;
