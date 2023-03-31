import { Form, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

export const MemberForm = ({ show, setShow, member, project, reloadData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  return (
    <Modal
      title="ADD MEMBER"
      open={show}
      onCancel={() => {
        setShow(false);
      }}
      centered
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          name: member?.name,
          email: member?.email,
          roles: member?.roles,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              validator: async (rule, value) => {
                if (
                  project.members.find(
                    (member) => member.member.email === value
                  ) &&
                  !member
                )
                  throw new Error("Member already exists");
              },
            },
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <input type="email" />
        </Form.Item>

        <Form.Item label="Role" name="roles">
          <Select mode="multiple" value={member?.roles}>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="developer">Developer</Select.Option>
            <Select.Option value="tester">Tester</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
