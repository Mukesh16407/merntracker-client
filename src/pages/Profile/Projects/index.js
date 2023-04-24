import React, { useEffect, useState } from 'react'
import { Button, message, Table } from "antd";
import moment from "moment";
import { dateFormat } from "../../../utils/constants";
import { ProjectForm } from './ProjectForm';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loaderSlice';
import { DeleteProject, GetAllProjects } from '../../../apicalls/projects';

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects = [], setProjects] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    const dispatch = useDispatch();

    const getProjects =async()=>{
     
      try{
       dispatch(SetLoading());
       const response = await GetAllProjects();
       dispatch(SetLoading());
       if(response.success){
        setProjects(response.data)
       }else{
        throw new Error(response.message);
       }

      }catch(error){
        dispatch(SetLoading(false));
        message.error(error.message);
      }
    }
    useEffect(() => {
      getProjects();
    }, []);

    const deleteHandler = async (id) => {
      try{
        dispatch(SetLoading());
        const response = await DeleteProject(id);
        dispatch(SetLoading());
        if (response.success) {
          message.success(response.message);
          getProjects();
        } else{
          throw new Error(response.message);
        } 
      }catch(error){
        dispatch(SetLoading(false));
        message.error(error.message);
      }
    }

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
        render: (text) => text.toUpperCase(),
        
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: (text) => dateFormat(text),
        
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
          <div className="flex gap-5">
            <i
            className="ri-delete-bin-line"
            onClick={() => deleteHandler(record._id)}
           
          ></i>
           <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedProject(record);
              setShowProjectForm(true);
            }}
          ></i>
          </div>
        )
      
      },
    ];
  return (
    <div className="flex flex-col gap-5">
    <div className="flex justify-end">
      <Button type="default"onClick={() => setShowProjectForm(true)} >
        Add Project
      </Button>
      <Table columns={columns} dataSource={projects} />
      {showProjectForm &&(
         <ProjectForm
         show={showProjectForm}
         setShow={setShowProjectForm}
         project={selectedProject}
         reloadProjects={getProjects}
       />
      )}
    </div>
    </div>
  )
}