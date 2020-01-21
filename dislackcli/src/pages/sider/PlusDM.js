import ReactDOM from "react-router-dom";
import React from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";
import DmUserList from "./DmUserList";
const PlusDM = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      console.log("PLUS_DM_PROPS", props);
      super(props);
      this.state = {
        name: "",
        userList: null,
        selectUser: null,
      };
      this.getUserList = this.getUserList.bind(this);
      this.clickUser = this.clickUser.bind(this);
    }
    // methods
    // 1. 유저리스트 불러와서 뿌리기
    getUserList = () => {
      axios
        .get(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/user/list`,
          {
            withCredentials: true,
          },
        )
        .then(res => {
          // res.data는 유저데이터
          const userList = res.data.filter(val => val !== this.props.userInfo);
          console.log(userList);
          this.setState({ userList });
        });
    };
    // 2. 유저선택
    clickUser = e => {
      console.log(e);
      const result = this.state.userList.filter(val => val.name === e);
      this.setState({ selectUser: result[0].id });
    };
    // 3. 방생성 요청
    createDM = () => {
      const user = { friend_id: this.state.selectUser };
      axios
        .post(
          `${process.env.REACT_APP_DEV_URL}/${this.props.currentWorkspace[0].code}/room/create`,
          user,
          {
            withCredentials: true,
          },
        )
        .then(res => {
          console.log("방생성완료");
          this.props.setChannelDM("DM", res.data);
        })
        .catch(err => {
          console.log("방생성에러", err);
        });
    };
    // lifeCycle
    componentDidMount() {
      // 1. 모달창이 켜지면 유저리스트를 불러온다.
      this.getUserList();
    }
    render() {
      const { userList } = this.state;
      // 자기자신을 제외한 유저리스트
      const { visible, onCancel, onCreate, form, handleState } = this.props;
      const { getFieldDecorator } = form;
      return (
        <div>
          <div>선택한 유저 보이는 창</div>
          <div>
            {userList ? (
              userList.map(val => (
                <DmUserList
                  key={Math.random()}
                  userList={val}
                  clickUser={async e => {
                    await this.clickUser(e);
                    console.log("유저클릭후", this.state);
                    await this.createDM();
                  }}
                />
              ))
            ) : (
              <div>User Loading...</div>
            )}
          </div>
        </div>
      );
    }
  },
);
export default PlusDM;
