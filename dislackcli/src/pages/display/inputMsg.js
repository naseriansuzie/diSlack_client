import React from "react";
import { Row, Col, Icon, Input, Form } from "antd";

const { Search } = Input;

class InputMsg extends React.Component {
  constructor(props) {
    super(props);
    console.log("INPUT_PROPS", props);
    this.state = {
      message: "",
    };
  }

  handleChange = e => {
    const { userInfo } = this.props.props;
    this.setState({
      user_id: userInfo.user_id,
      name: userInfo.name,
      email: userInfo.email,
      message: e.target.value,
    });
    // state를 객체로 만들어 서버에 POST한다.
    console.log(this.state);
  };

  enterClick = e => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        this.handleChange(e);
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
            onKeyPress={this.enterClick}
          />
        </Form>
      </div>
    );
  }
}

export default InputMsg;
