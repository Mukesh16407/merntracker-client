import { Form, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

export const MemberForm = () => {
  const dispatch = useDispatch();
  
  return (
    <Modal
      title="ADD MEMBER"
      
      centered
     
    >
      <Form
        layout="vertical"
       
       
      >
        <Form.Item
          label="Email"
          name="email"
         
        >
          <input type="email" />
        </Form.Item>

        <Form.Item label="Role" name="roles">
          <Select mode="multiple" >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="developer">Developer</Select.Option>
            <Select.Option value="tester">Tester</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
