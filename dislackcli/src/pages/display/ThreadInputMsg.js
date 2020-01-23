import React from "react";
import { Input, Form } from "antd";
import axios from "axios";

class ThreadInputMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
    };
    this.deleteInput = this.deleteInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterClick = this.enterClick.bind(this);
  }

  deleteInput = e => {
    e.target.value = "";
  };

  componentDidMount() {
    this.type = this.props.currentDisplay.name;
  }

  async handleChange(e) {
    await this.setState({ reply: e.target.value });
    const reply = this.state;

    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${
          this.props.props.currentWorkspace[0].code
        }/${this.type ? "channelmessage" : "directmessage"}/${
          this.props.currentDisplay.id
        }/${this.props.props.clickedMsg[0].id}`,
        reply,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {})
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
        this.deleteInput(e);
      }
    }
  };

  render() {
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
