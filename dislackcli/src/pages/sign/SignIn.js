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
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  };

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return <div>1</div>;
  }
}

export default Signin;
