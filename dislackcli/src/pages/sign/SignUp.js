import React from "react";
import { Redirect, Link } from "react-router-dom";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Row,
  Col,
  Card,
} from "antd";
import axios from "axios";
import dotenv from "dotenv";
import "./Signup.css";

dotenv.config();

class SignUp extends React.Component {
  state = {
    confirmDirty: false,
    isSignUp: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // ec2 엔드포인트 나오면 URL 업데이트
        axios
          .post(`${process.env.REACT_APP_DEV_URL}/user/signup`, values, {
            withCredentials: true,
          })
          .then(res => {
            if (res.status === 201) {
              alert("회원가입에 성공했습니다!");
              this.setState({ isSignUp: true });
            }
          })
          .catch(err => {
            if (err.response && err.response.status === 409) {
              alert("이미 가입한 회원입니다! 로그인해주세요 :)");
            }
            if (err.response && err.response.status === 419) {
              localStorage.setItem("isLogin", null);
              this.setState({ isLogin: false });
              alert("다시 로그인 해주세요");
              window.location = "/signin";
            } else console.log(err);
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("입력한 비밀번호와 다릅니다. 비밀번호를 재확인 해주세요.");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.isSignUp) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
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
              <div className="signin-main-1-1-1">Sign up to Crong</div>
              <div className="signin-main-1-1-2">slack cloning with crong</div>
            </div>
            <Form className="signup-main-1-1" onSubmit={this.handleSubmit}>
              <Form.Item label="이메일 주소" className="signin-main-1-1-input">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message:
                        "이메일 형식이 아닙니다. 이메일 형식에 맞춰서 입력해주세요!",
                    },
                    {
                      required: true,
                      message: "이메일 주소를 기입해주세요!",
                    },
                  ],
                })(<Input className="signin-main-1-1-input-1" />)}
              </Form.Item>
              <Form.Item
                className="signin-main-1-2-input"
                label="비밀번호"
                hasFeedback
              >
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "비밀번호를 입력해주세요!",
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password className="signin-main-1-2-input-1" />)}
              </Form.Item>
              <Form.Item
                className="signin-main-1-3-input"
                label="비밀번호 재입력"
                hasFeedback
              >
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "비밀번호를 재입력해주세요!",
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(
                  <Input.Password
                    className="signin-main-1-3-input-1"
                    onBlur={this.handleConfirmBlur}
                  />,
                )}
              </Form.Item>
              <Form.Item
                className="signin-main-1-4-input"
                label={
                  <span>
                    이름&nbsp;
                    <Tooltip title="워크스페이스에서 어떤 이름을 사용하시겠어요?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "워크스페이스에서 사용할 이름을 기입해주세요!",
                      whitespace: true,
                    },
                  ],
                })(<Input className="signin-main-1-4-input-1" />)}
              </Form.Item>
              {/* <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator("agreement", {
                  valuePropName: "checked",
                })(
                  <Checkbox>
                    서비스 회원가입을 위한 이메일 주소 제출을 동의합니다.
                  </Checkbox>,
                )}
              </Form.Item> */}
              <Form.Item className="signin-main-1-5-input">
                <Button type="primary" htmlType="submit">
                  Sign up
                </Button>
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

export default Form.create({ name: "register" })(SignUp);
