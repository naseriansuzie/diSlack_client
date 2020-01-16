import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import "antd/dist/antd.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
    // console.log(this.state);
  };

  render() {
    // console.log(this.props.form);
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        style={{
          borderRadius: 10,
          marginTop: "10%",
          marginLeft: "20%",
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
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" },
              ],
            })(
              <Input
                style={{ height: 50 }}
                prefix={
                  <Icon
                    type="user"
                    style={{ color: "rgba(0,0,0,.25)" }}
                    onChange={this.handleInputValue("email")}
                  />
                }
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
              ],
            })(
              <Input
                style={{ height: 50 }}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onChange={this.handleInputValue("password")}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                float: "right",
                height: 60,
                width: "100%",
                fontSize: 20,
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create({ name: "normal_login" })(Signin);
