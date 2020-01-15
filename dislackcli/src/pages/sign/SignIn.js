import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import "antd/dist/antd.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log(e.target.value);
    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userInfo);
    // 포스트 요청하고 난 뒤 리다이렉트를 워크스페이스목록으로 이동한다
  };

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <Card
        style={{
          borderRadius: 10,
          marginTop: 80,
          marginLeft: 600,
          width: 600,
          backgroundColor: "#bdc3c7",
        }}
      >
        <Form className="login_form" onSubmit={this.handleSubmit} />
        <Form.Item>
          <Input
            className="login_input"
            style={{ height: 50 }}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            onChange={this.handleInputValue("email")}
          />
        </Form.Item>
        <Form.Item>
          <Input
            style={{ height: 50 }}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            onChange={this.handleInputValue("password")}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              float: "right",
              height: 60,
              width: 90,
              fontSize: 20,
            }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Card>
    );
  }
}

export default Signin;
