import React, { useState } from 'react'
import { Button, message, Table } from "antd";
import moment from "moment";
import { ProjectForm } from './ProjectForm';

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects = [], setProjects] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);


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
        title: "Status",
        dataIndex: "status",
        
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        
      },
      {
        title: "Actions",
        dataIndex: "actions",
      
      },
    ];
  return (
    <div className="flex flex-col gap-5">
    <div className="flex justify-end">
      <Button type="default" >
        Add Project
      </Button>
      <Table columns={columns} dataSource={projects} />
      {showProjectForm && (
        <ProjectForm
          show={showProjectForm}
          setShow={setShowProjectForm}
          project={selectedProject}
          
        />
      )}
    </div>
    </div>
  )
}