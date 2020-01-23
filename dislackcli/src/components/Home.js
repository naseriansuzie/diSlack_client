import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import ".././App.css";
import axios from "axios";

const Home = props => {
  return (
    <>
      <div className="app-topBar">
        <h1 className="app-slackTitle">slack</h1>
        <div className="app-topMenu">
          {props.isLogin ? (
            <span></span>
          ) : (
            <Link to="/signup" className="app-topMenuOptions">
              Sign up
            </Link>
          )}
          {props.isLogin ? (
            <span></span>
          ) : (
            <Link to="/signin" className="app-topMenuOptions">
              Sign in
            </Link>
          )}
          {props.isLogin ? (
            <Button
              className="signoutBtn"
              onClick={() => {
                localStorage.setItem("isLogin", null);
                localStorage.setItem("userInfo", null);
                axios
                  .post(`${process.env.REACT_APP_DEV_URL}/user/signout`, null, {
                    withCredentials: true,
                  })
                  .then(res => {
                    if (res.status === 205) {
                      console.log("로그아웃", res);
                      props.handleLogout();
                    } else {
                      console.log("오류는아닌데 205도 아님");
                    }
                  })
                  .catch(err => {
                    if (err.response && err.response.status === 419) {
                      localStorage.setItem("isLogin", null);
                      // this.setState({ isLogin: false });
                      alert("다시 로그인 해주세요");
                      window.location = "/signin";
                    }
                    console.log(err);
                  });
              }}
            >
              Sign out
            </Button>
          ) : (
            <span></span>
          )}

          <Link to="/workspace" className="app-workspace">
            WORKSPACE
          </Link>
        </div>
      </div>

      <div className="home-main">
        <div className="home-main-1">
          Slack replaces email inside your company
        </div>
        <div className="home-main-2">
          Keep conversations organized in Slack, the smart alternative to email.
        </div>
        <div className="home-main-3">
          <Button className="home-main-btn-1" type="primary" size="large">
            TRY SLACK
          </Button>
          <Button className="home-main-btn-2" type="primary" size="large">
            SEE THE DEMO
          </Button>
        </div>
        <div className="home-main-4">
          Already using Slack?{" "}
          <Link className="home-main-4-1" to="/signin">
            Sign in
          </Link>
          .
        </div>
      </div>
      <div className="home-content">
        <div className="home-content-1">Break out of the inbox</div>
        <div className="home-content-2">
          Working in channels gives everyone on your team a shared view of
          progress and purpose.
        </div>
        <iframe
          className="home-content-3"
          width="870"
          height="490"
          src="https://www.youtube.com/embed/rZC7HYumJSo"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="home-content-4">
          <div className="home-content-4-1">
            <div>Conversations, organized</div>
            <div>
              Instead of a single overstuffed inbox, conversations in Slack
              happen in dedicated spaces called channels.
            </div>
          </div>
          <div className="home-content-4-2">
            <div>Get looped in, not out</div>
            <div>
              Slack makes it simple to follow conversations or find important
              information in an easily searchable archive.
            </div>
          </div>
          <div className="home-content-4-3">
            <div>Give focus a chance</div>
            <div>
              Unlike email, Slack lets you choose which conversations are most
              important — and which can wait.
            </div>
          </div>
        </div>
      </div>

      <div className="home-section">
        <div className="home-section-1">Choose a better way to work</div>
        <div className="home-section-2">
          <Button className="home-section-2-1" type="primary" size="large">
            THE SLACK
          </Button>
          <Button className="home-section-2-2" type="primary" size="large">
            CONTACT SALES
          </Button>
        </div>
      </div>
      <div className="home-aside">
        <div className="home-aside-1">
          <div className="home-aside-1-1">PRODUCT</div>
          <div className="home-aside-1-2">Why Slack?</div>
          <div className="home-aside-1-3">Enterprise</div>
          <div className="home-aside-1-4">Security</div>
          <div className="home-aside-1-5">Customer Stories</div>
          <div className="home-aside-1-6">Customer Stories</div>
          <div className="home-aside-1-7">Customer Stories</div>
        </div>
        <div className="home-aside-2">
          <div className="home-aside-2-1">SLACK FOR TEAMS</div>
          <div className="home-aside-2-2">Engineering</div>
          <div className="home-aside-2-3">Financial Services</div>
          <div className="home-aside-2-4">Sales</div>
          <div className="home-aside-2-5">IT</div>
          <div className="home-aside-2-6">Marketing</div>
          <div className="home-aside-2-7">Customer Support</div>
          <div className="home-aside-2-8">Human Resources</div>
          <div className="home-aside-2-9">Project Management</div>
          <div className="home-aside-2-10">Media</div>
        </div>
        <div className="home-aside-3">
          <div className="home-aside-3-1">RESOURCES</div>
          <div className="home-aside-3-2">Slack Tips</div>
          <div className="home-aside-3-3">Blog</div>
          <div className="home-aside-3-4">Slack Certified Program</div>
          <div className="home-aside-3-5">Help Center</div>
          <div className="home-aside-3-6">API</div>
          <div className="home-aside-3-7">App Directory</div>
          <div className="home-aside-3-8">DOwnload Slack</div>
          <div className="home-aside-3-9">Partners</div>
        </div>
        <div className="home-aside-4">
          <div className="home-aside-4-1">COMPANY</div>
          <div className="home-aside-4-2">About Us</div>
          <div className="home-aside-4-3">Leadership</div>
          <div className="home-aside-4-4">News</div>
          <div className="home-aside-4-5">Media Kit</div>
          <div className="home-aside-4-6">Careers</div>
        </div>
      </div>
      <div className="home-footer">
        © Copyright 2020 Slack Technologies, Inc. All rights reserved. Various
        trademarks held by their respective owners.
      </div>
    </>
  );
};

export default Home;
