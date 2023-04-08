import { Form, Input, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";


export const ProjectForm = ({ show, setShow,  project,reloadProjects = () => {} }) => {
  return (
    <Modal open={show}>
    <Form
      layout="vertical"
      onCancel={() => {
        setShow(false);
        reloadProjects();
      }}
      centered
    >
      <div className="grid grid-cols-3">
      <Form.Item label="Project Name" name="name">
        <Input placeholder="Project Name" />
      </Form.Item>
      <Form.Item label="Project Description" name="description">
        <TextArea placeholder="Project Description" />
      </Form.Item>
      </div>
     
    </Form>
  </Modal>
  )
}
