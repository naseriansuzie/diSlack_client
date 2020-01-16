import React from "react";
import { Input, Form } from "antd";

class InputMsg extends React.Component {
  constructor(props) {
    super(props);
    console.log("INPUT_PROPS", props);
    this.state = {
      message: "",
    };
    this.deleteInput = this.deleteInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterClick = this.enterClick.bind(this);
  }

  deleteInput = e => {
    console.log(e.target.value);
    e.target.value = "";
  };

  handleChange = e => {
    const { userInfo } = this.props.props;
    this.setState({
      user_id: userInfo.user_id,
      name: userInfo.name,
      email: userInfo.email,
      message: e.target.value,
    });
    // state를 객체로 만들어 서버에 POST한다.
    // console.log("핸들체인지E", e.target.value);
  };

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
    // const { userInfo } = this.props.props;
    // console.log(userInfo);

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
