import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, message, Tag } from "antd";
import { SetLoading } from "../../redux/loaderSlice";
import { GetAllProjects } from "../../apicalls/projects";
import { dateFormat } from "../../utils/constants";
export const Home = () => {
  const { user } = useSelector((state) => state.users);

  const [projects = [], setProjects] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProjects = async () => {
    try {
      dispatch(SetLoading());
      const response = await GetAllProjects();
      dispatch(SetLoading());
      if (response.success) {
        setProjects(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <h1 className="text-primary text-xl">
        Heyy Welcome to NP-Tracker you have {projects.length} projects
      </h1>
      <span>Select a project to view its details</span>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {projects.map((project) => (
          <div
            className="p-2 rounded-md border border-solid border-gray-300 cursor-pointer flex flex-col gap-2"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <h1 className="text-xl uppercase font-semibold">{project.name}</h1>
            <span>{project.description}</span>
            <span>Created at: {dateFormat(project.createdAt)}</span>
            <div className="flex justify-end">
              <Tag color={project.status === "active" ? "blue" : "red"}>
                {project.status}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
