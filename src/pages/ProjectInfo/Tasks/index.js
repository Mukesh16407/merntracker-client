import React, { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Button, message, Table } from "antd";

export const Tasks = ({ project, isUserAdminOrOwner }) => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
     
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
     
    },

    {
      title: "Assigned On",
      dataIndex: "assignedOn",
      
    },
    {
      title: "Status",
      dataIndex: "status",
      
    },
    {
      title: "Actions",
      dataIndex: "actions",
     
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        
          <Button
            type="default"
           
          >
            Create Task
          </Button>
        
      </div>

      <Table columns={columns}  />

      
        <TaskForm />
    
    </div>
  
  )
};
