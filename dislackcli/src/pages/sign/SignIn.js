import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
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
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
  };

  render() {
    console.log(this.props.userLogin);
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
        <Form
          className="login_form"
          onSubmit={e => {
            e.preventDefault();
            const userInfo = {
              email: this.state.email,
              password: this.state.password,
            };

            axios
              .post(`${process.env.REACT_APP_DEV_URL}/signin`, userInfo, {
                withCredentials: true, // 쿠키전달
              })
              .then(res => {
                if (res.status === 200) {
                  this.props.userLogin();
                } else {
                  alert("이메일이나 패스워드 확인하세요");
                }
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
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
        </Form>
      </Card>
    );
  }
}

export default Signin;
