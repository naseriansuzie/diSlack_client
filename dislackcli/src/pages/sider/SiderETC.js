import React from "react";
import { Menu, Icon, Modal, Button } from "antd";
import "antd/dist/antd.css";
import "./SiderETC.css";

const SiderETC = () => (
  <div className="SiderETC-container">
    <div
      className="Sider-Title"
      style={{
        marginTop: "5%",
        marginLeft: "3%",
        marginBottom: "7%",
        fontSize: "13px",
      }}
    >
      <Icon
        type="plus"
        style={{
          fontSize: "12px",
          marginLeft: "3%",
          marginRight: "1%",
          marginBottom: "5%",
        }}
      />
      Invite People
    </div>

    <div className="SiderETC-Bottom">
      <div className="SiderETC-Bottom-title">App</div>
      <div className="SiderETC-Bottom-item">
        <div
          className="Sider-Title"
          style={{
            marginTop: "5%",
            marginLeft: "3%",
            marginBottom: "7%",
            fontSize: "13px",
          }}
        >
          <Icon type="plus" style={{ fontSize: "12px", marginRight: "1%" }} />
          Connect Google Calendar
        </div>
        <div
          className="Sider-Title"
          style={{
            marginTop: "5%",
            marginLeft: "3%",
            marginBottom: "7%",
            fontSize: "13px",
          }}
        >
          <Icon type="plus" style={{ fontSize: "12px", marginRight: "1%" }} />
          Connect Google Drive
        </div>
        <div
          className="Sider-Title"
          style={{
            marginTop: "5%",
            marginLeft: "3%",
            marginBottom: "7%",
            fontSize: "13px",
          }}
        >
          <Icon type="plus" style={{ fontSize: "12px", marginRight: "1%" }} />
          Add more apps
        </div>
      </div>
    </div>
  </div>
);

export default SiderETC;
