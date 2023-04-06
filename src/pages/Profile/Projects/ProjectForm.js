import { Form, Input, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export const ProjectForm = ({ show, setShow, reloadData, project }) => {
  return (
    <Modal open={show}>
    <Form
      layout="vertical"
     
    >
      <Form.Item label="Project Name" name="name">
        <Input placeholder="Project Name" />
      </Form.Item>
      <Form.Item label="Project Description" name="description">
        <TextArea placeholder="Project Description" />
      </Form.Item>
    </Form>
  </Modal>
  )
}
