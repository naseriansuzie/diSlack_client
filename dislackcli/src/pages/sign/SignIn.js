import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Signin.css";

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
      }
    });
  };

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.isLogin ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="signin-header">
          <div className="signin-header-1">
            <Link className="signin-header-1-1" to="/">
              Crong
            </Link>
          </div>
          <div className="signin-header-2">
            <Link className="signin-header-workspace" to="/workspace">
              Find your workspace
            </Link>
            <Link className="signin-header-signin" to="/signin">
              Sign in
            </Link>
          </div>
        </div>

        <div className="signin-main">
          <Card className="signin-main-1">
            <div className="signin-main-1-1">
              <div className="signin-main-1-1-1">Sign in to Crong</div>
              <div className="signin-main-1-1-2">slack cloning with crong</div>
            </div>
            <div className="signin-main-1-2">
              Enter your <b>email address</b> and <b>password</b>.
            </div>
            <Form
              className="signin-main-1-3"
              onSubmit={e => {
                e.preventDefault();
                const userInfo = {
                  email: this.state.email,
                  password: this.state.password,
                };

                axios
                  .post(
                    `${process.env.REACT_APP_DEV_URL}/user/signin`,
                    userInfo,
                    {
                      withCredentials: true,
                    },
                  )
                  .then(res => {
                    if (res.status === 200) {
                      localStorage.setItem("isLogin", true);
                      localStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.data),
                      );
                      this.props.handleLogin();
                      //this.props.updateUserInfo(res.data, this.state.email);
                      return res;
                    }
                  })
                  .catch(err => {
                    if (err.response.status === 403) {
                      alert(
                        "회원 정보가 일치하지 않습니다. 이메일주소와 비밀번호를 확인해주세요!",
                      );
                    }
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
                    className="signin-main-1-3-input-1-1"
                    prefix={<Icon type="user" />}
                    onChange={this.handleInputValue("email")}
                    placeholder="you@example.com"
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
                    className="signin-main-1-3-input-2"
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInputValue("password")}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signin-main-1-3-btn-1"
                >
                  Sigin in
                </Button>
                <Link to="/signup">register now!</Link>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="signin-aside">
          <div className="signin-aside-1">
            <div className="signin-aside-1-1">USING SLACK</div>
            <div className="signin-aside-1-2">Product</div>
            <div className="signin-aside-1-3">Enterprise</div>
            <div className="signin-aside-1-4">Pricing</div>
            <div className="signin-aside-1-5">Support</div>
            <div className="signin-aside-1-6">Slack Guides</div>
            <div className="signin-aside-1-7">App Directory</div>
            <div className="signin-aside-1-8">API</div>
          </div>
          <div className="signin-aside-2">
            <div className="signin-aside-2-1">SLACK</div>
            <div className="signin-aside-2-2">Jobs</div>
            <div className="signin-aside-2-3">Customers</div>
            <div className="signin-aside-2-4">Developers</div>
            <div className="signin-aside-2-5">Events</div>
            <div className="signin-aside-2-6">Blog</div>
          </div>
          <div className="signin-aside-3">
            <div className="signin-aside-3-1">LEGAL</div>
            <div className="signin-aside-3-2">Privacy</div>
            <div className="signin-aside-3-3">Security</div>
            <div className="signin-aside-3-4">Terms of Service</div>
            <div className="signin-aside-3-5">Policies</div>
          </div>
          <div className="signin-aside-4">
            <div className="signin-aside-4-1">HANDY LINKS</div>
            <div className="signin-aside-4-2">Download desktop app</div>
            <div className="signin-aside-4-3">Download mobile app</div>
            <div className="signin-aside-4-4">Brand Guidelines</div>
            <div className="signin-aside-4-5">Slack at Work</div>
            <div className="signin-aside-4-6">Status</div>
          </div>
        </div>
        <div className="signin-footer">
          <div>ㅁ</div>
          <div>Contact Us</div>
        </div>
      </>
    );
  }
}

export default Form.create({ name: "normal_login" })(Signin);
