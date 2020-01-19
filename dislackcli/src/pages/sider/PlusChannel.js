import ReactDOM from "react-router-dom";
import React from "react";
import { Button, Modal, Form, Input, Radio } from "antd";

const PlusChannel = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
      };
    }

    render() {
      const { visible, onCancel, onCreate, form, handleState } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form layout="vertical">
          <Form.Item label="Title">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ],
            })(
              <Input
                onChange={e => {
                  handleState(e.target.value);
                }}
              />,
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description")(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item className="collection-create-form_last-form-item">
            {getFieldDecorator("modifier", {
              initialValue: "public",
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      );
    }
  },
);

export default PlusChannel;
