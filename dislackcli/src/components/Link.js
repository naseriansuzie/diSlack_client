import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Card, Form } from "antd";
import "../pages/sign/Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
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
          <Card className="signin-main-1"></Card>
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
