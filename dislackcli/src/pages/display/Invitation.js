import React from "react";
import { Form, Input, Radio } from "antd";

const Invitation = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = { email: "" };
    }

    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <div>
          <Form layout="vertical">
            <Form.Item label="Email">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "초대하고자 하는 분의 이메일을 적어주세요!!",
                  },
                ],
              })(
                <Input
                  onChange={e => {
                    this.props.updateEmail(e);
                  }}
                  onSubmit={e => {
                    e.preventDefault();
                    this.props.sendEmail();
                  }}
                />,
              )}
            </Form.Item>
          </Form>
        </div>
      );
    }
  },
);
export default Invitation;
