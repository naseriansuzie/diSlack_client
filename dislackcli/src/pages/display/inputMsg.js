import React from "react";
import { Input, Form } from "antd";
import axios from "axios";

class InputMsg extends React.Component {
  constructor(props) {
    super(props);
    // console.log("INPUT_PROPS", props);
    this.state = {
      message: "",
    };
    this.deleteInput = this.deleteInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterClick = this.enterClick.bind(this);
  }

  deleteInput = e => {
    // console.log(e.target.value);
    console.log(e);
  };

  async handleChange(e) {
    await this.setState({ message: e.target.value });
    const msg = this.state;
    // 변수하나를 해서 type이 있으면 ch , 없으면 dm 으로 해서 주소도 변수로 한다. -> 쓰레드 인풋 메세지에도 해야 한다.
    // currentDisplay가 채널이면 handleChange , DM이면 변수를 주자 /:code/directmessage/:id(room)
    const address = this.props.currentDisplay.name
      ? "channelmessage"
      : "directmessage";
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${this.props.props.currentWorkspace[0].code}/${address}/${this.props.currentDisplay.id}`,
        msg,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        // console.log(res); app.js의 네임을 쓴다
      })
      .catch(err => {
        if (err.response.status === 419) {
          localStorage.setItem("isLogin", null);
          this.setState({ isLogin: false });
          alert("다시 로그인 해주세요");
        }
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
            style={{ height: "100%" }}
            type="text"
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
