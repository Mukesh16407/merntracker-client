import React, { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Button, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { DeleteTask, GetTasks, UpdateTask } from "../../../apicalls/task";
import { dateFormat } from "../../../utils/constants";

export const Tasks = ({ project, isUserAdminOrOwner }) => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getTasks = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetTasks({ project: project._id });
      dispatch(SetLoading(false));
      if (response.success) setTasks(response.data);
      else throw new Error(response.message);
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteTask(id);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        getTasks();
      } else throw new Error(response.message);
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const onTaskStatusChange = async (task) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateTask(task);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        getTasks();
      } else throw new Error(response.message);
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Assigned By",
      dataIndex: "assignedBy",
      render: (assignedBy, record) => record.assignedBy.name,
     
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      render: (assignedTo, record) => record.assignedTo.name,
    },

    {
      title: "Assigned On",
      dataIndex: "assignedOn",
      render: (assignedOn) => dateFormat(assignedOn),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => {
        return (
          <select
            name="status"
            value={status}
            onChange={(e) => {
              record.status = e.target.value;
              onTaskStatusChange(record);
            }}
            disabled={
              (record.assignedTo._id !== user._id && !isUserAdminOrOwner) ||
              record.status === "closed"
            }
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option
              value="closed"
              disabled={record.assignedTo._id === user._id}
            >
              Closed
            </option>
          </select>
        );
      },
      
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => {
        return (
          isUserAdminOrOwner && (
            <div className="flex gap-2">
              <Button
                type="default"
                onClick={() => {
                  deleteTask(record._id);
                }}
              >
                Delete
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setSelectedTask(record);
                  setShowTaskForm(true);
                }}
              >
                Edit
              </Button>
            </div>
          )
        );
      },
    },
  ];

  // if user is not admin or owner then remove actions column
  if (!isUserAdminOrOwner) {
    columns.pop();
  }

  return (
    <div className="flex flex-col gap-5">
    <div className="flex justify-end">
      {isUserAdminOrOwner && (
        <Button
          type="default"
          onClick={() => {
            setSelectedTask(null);
            setShowTaskForm(true);
          }}
        >
          Create Task
        </Button>
      )}
    </div>

    <Table columns={columns} dataSource={tasks} />

    {showTaskForm && (
      <TaskForm
        show={showTaskForm}
        setShow={setShowTaskForm}
        task={selectedTask}
        reloadTasks={getTasks}
        project={project}
      />
    )}
  </div>
  
  )
};
