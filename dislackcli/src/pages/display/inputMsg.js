import React from "react";
import { Row, Col, Icon, Input, Form } from "antd";

const { Search } = Input;

class InputMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value,
    });
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
    console.log("1");
    return (
      <div style={{ margin: "1%" }}>
        <Form style={{ height: "50px" }}>
          <Input
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
