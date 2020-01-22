import React from "react";
import { Input, Form } from "antd";
import axios from "axios";

class ThreadInputMsg extends React.Component {
  constructor(props) {
    super(props);
    console.log("INPUT_PROPS", props);
    this.state = {
      reply: "",
    };
    this.deleteInput = this.deleteInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterClick = this.enterClick.bind(this);
  }

  deleteInput = e => {
    // console.log(e.target.value);
    e.target.value = "";
  };

  async handleChange(e) {
    await this.setState({ reply: e.target.value });
    const reply = this.state;
    ///:code/channelmessage/:id(channel)/:id(message)
    const address = this.props.currentDisplay.name
      ? "channelmessage"
      : "directmessage";

    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${this.props.props.currentWorkspace[0].code}/${address}/${this.props.currentDisplay.id}/${this.props.props.clickedMsg[0].id}`,
        reply,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        // console.log(res); app.js의 네임을 쓴다
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
        // console.log("인풋값 : ", e.target.value);
        this.deleteInput(e);
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
            style={{ height: "100%" }}
            type="text"
            onKeyPress={e => {
              this.enterClick(e);
            }}
          />
        </Form>
      </div>
    );
  }
}

export default ThreadInputMsg;
