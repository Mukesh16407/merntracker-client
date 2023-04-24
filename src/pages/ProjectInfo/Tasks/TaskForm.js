import React from "react";
import { Form, Input, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { CreateTask, UpdateTask } from "../../../apicalls/task";
export const TaskForm = ({ show, setShow, task, reloadTasks = () => {}, project }) => {

  const { user } = useSelector((state) => state.users);
  const [formRef] = Form.useForm();
  const dispatch = useDispatch();
  const developers = project.members.filter((member) =>
    member.roles.includes("developer")
  );

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (task) {
        values._id = task._id;
        response = await UpdateTask(values);
      } else {
        values.project = project._id;
        values.assignedBy = user._id;
        response = await CreateTask(values);
      }
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        setShow(false);
        reloadTasks();
      } else throw new Error(response.message);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  return (
    <Modal  title={task ? "UPDATE TASK" : "CREATE TASK "}
    open={show}
    onCancel={() => {
      setShow(false);
    }}
    centered
    onOk={() => {
      formRef.submit();
    }}>
      <Form  form={formRef}
        layout="vertical"
        onFinish={onFinish}
        initialValues={task}>
         <Form.Item label="Name" name="name">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea type="text" />
        </Form.Item>
        <Form.Item label="Assign To" name="assignedTo">
          <select name="" id="">
            <option value="">Select</option>
            {developers.map((dev) => (
              <option value={dev.member._id}>{dev.member.name}</option>
            ))}
          </select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
