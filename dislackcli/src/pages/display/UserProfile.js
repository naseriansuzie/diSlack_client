import React from "react";
import { List, Button, Modal, Col } from "antd";
import ImageUploader from "./ImageUploader";
import "./ThreadCommon.css";
import "./UserProfile.css";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visibleImg: false };
    this.handleOKImg = this.handleOKImg.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOKImg = e => {
    this.setState({ visibleImg: false });
  };
  handleCancel = e => {
    this.setState({ visibleImg: false });
  };
  showModalImg = () => {
    this.setState({ visibleImg: true });
  };
  render() {
    const { clickedUser, handleProfileClose } = this.props;
    if (clickedUser) {
      return (
        <div className="Thread-container">
          <Col className="Thread-scroll">
            <List
              size="large"
              bordered
              dataSource={[clickedUser]}
              renderItem={clickedUser => (
                <div>
                  <List.Item className="Thread-back-color">
                    <Col span={20} className="Thread-title-pad">
                      <div className="Thread-header-col Thread-title">
                        Check out Your Colleague
                      </div>
                    </Col>
                    <Col span={4} className="Thread-center">
                      <a
                        className="Thread-header-col Thread-X"
                        onClick={handleProfileClose}
                      >
                        X
                      </a>
                    </Col>
                  </List.Item>
                  <List.Item style={{ border: "0", padding: "0" }}>
                    <img
                      className="User-img-size"
                      src="https://ca.slack-edge.com/TPZ4UBX3M-UQCUMDEJH-g946740d6c76-512"
                    />
                  </List.Item>
                  <List.Item>
                    <Col span={12} className="User-btn-display">
                      <Button className="User-btn User-text">Message</Button>
                    </Col>
                    <Col span={12} className="User-btn-display">
                      <Button
                        className="User-btn User-text"
                        onClick={e => {
                          this.showModalImg(e);
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Col>
                    <Modal
                      title="Profile Image Upload"
                      visible={this.state.visibleImg}
                      onOk={() => {
                        this.handleOKImg();
                      }}
                      onCancel={() => {
                        this.handleCancel();
                      }}
                    >
                      <ImageUploader
                        handleOKImg={this.handleOKImg}
                        handleCancel={this.handleCancel}
                      />
                    </Modal>
                  </List.Item>
                  <List.Item className="User-pad">
                    <h3 className="User-text">Good Day!</h3>
                  </List.Item>
                  <List.Item className="User-list-item">
                    <h4>Name</h4>
                    {clickedUser.name}
                  </List.Item>
                  <List.Item className="User-list-item">
                    <h4>Local Time</h4>
                    {new Date().toLocaleTimeString()}
                  </List.Item>
                  <List.Item className="User-list-item">
                    <h4>Email</h4>
                    {clickedUser.email}
                  </List.Item>
                </div>
              )}
            />
          </Col>
        </div>
      );
    } else return <div>사용자를 다시 찾아주세요!</div>;
  }
}
