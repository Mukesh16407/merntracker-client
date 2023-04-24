import React, { useState } from "react";
import { message, Tabs } from "antd";
import { Tasks } from "./Tasks";
import Members from "./Members";
import Settings from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SetLoading } from "../../redux/loaderSlice";
import { GetProjectById } from "../../apicalls/projects";
import { dateFormat } from "../../utils/constants";

export const ProjectInfo = () => {
  const [project, setProject] = useState(null);
  const [isUserAdminOrOwner, setIsUserAdminOrOwner] = useState(false);

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetProjectById(params.id);
      dispatch(SetLoading(false));
      if (response.success) {
        setProject(response.data);

        // Check if user is admin or owner
        let isUserAdminOrOwnerTemp = false;
        if (response.data.owner._id === user._id) {
          isUserAdminOrOwnerTemp = true;
        } else {
          const memberInProject = response.data.members.find(
            (memberObj) => memberObj.member._id === user._id
          );
          if (memberInProject.roles.includes("admin"))
            isUserAdminOrOwnerTemp = true;
        }
        setIsUserAdminOrOwner(isUserAdminOrOwnerTemp);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    project && (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl uppercase">{project.name}</h1>
            <span>{project.description}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>Created at: {dateFormat(project.createdAt)}</span>
            <span>Created by: {project.owner.name}</span>
          </div>
        </div>

        <Tabs defaultActiveKey="1" className="mt-5">
          <Tabs.TabPane tab="Tasks" key="1">
            <Tasks
              isUserAdminOrOwner={isUserAdminOrOwner}
              project={project}
              reloadData={getData}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Members" key="2">
            <Members
              members={project.members}
              reloadData={getData}
              project={project}
              isUserAdminOrOwner={isUserAdminOrOwner}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Settings" key="3">
            <Settings />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  );
};
