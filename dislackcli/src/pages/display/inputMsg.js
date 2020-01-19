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
    e.target.value = "";
  };

  async handleChange(e) {
    await this.setState({ message: e.target.value });
    const msg = this.state;
    axios
      .post(
        `${process.env.REACT_APP_DEV_URL}/${this.props.props.currentWorkspace[0].code}/${this.props.currentDisplay.id}`,
        msg,
        {
          withCredentials: true, // 쿠키전달
        },
      )
      .then(res => {
        // console.log(res); app.js의 네임을 쓴다
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

export default InputMsg;
