import React from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Tooltip, Icon, Checkbox, Button, Row, Col } from "antd";
import axios from "axios";
import dotenv from "dotenv";

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
        // console.log("Received values of form: ", values);
        // ec2 엔드포인트 나오면 URL 업데이트
        axios
          .post(`${process.env.REACT_APP_DEV_URL}/user/signup`, values, {
            withCredentials: true,
          })
          .then(res => {
            if (res.status === 201) {
              alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다!");
              this.setState({ isSignUp: true });
            } else {
              alert("이미 가입한 회원입니다.");
            }
          })
          .catch(err => {
            console.log(err);
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    if (this.state.isSignUp) {
      return (
        <div>
          <Redirect to="/signin" />
        </div>
      );
    }
    return this.props.isLogin ? (
      <Redirect to="/workspace" />
    ) : (
      <div>
        {/* <Row>
          <Col span={24} style={{ color: "white" }}>
            header
          </Col>
        </Row> */}
        <Row>
          <Col span={4} />
          <Col span={12} value={120}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="이메일 주소">
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
                })(<Input />)}
              </Form.Item>
              <Form.Item label="비밀번호" hasFeedback>
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
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="비밀번호 재입력" hasFeedback>
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
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item
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
                })(<Input />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator("agreement", {
                  valuePropName: "checked",
                })(
                  <Checkbox>
                    서비스 회원가입을 위한 이메일 주소 제출을 동의합니다.
                  </Checkbox>,
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={4} />
        </Row>
        <Row>
          <Col span={24} style={{ color: "white" }}>
            footer
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: "register" })(SignUp);
