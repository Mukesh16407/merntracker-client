import React from "react";
import { Form, Input, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

export const TaskForm = () => {
  return (
    <Modal centered>
      <Form layout="vertical">
        <Form.Item label="Name" name="name">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea type="text" />
        </Form.Item>
        <Form.Item label="Assign To" name="assignedTo">
          <select name="" id="">
            <option value="">Select</option>
          </select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
