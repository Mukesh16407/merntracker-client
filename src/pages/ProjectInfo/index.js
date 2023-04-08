import React, { useState } from "react";
import { message, Tabs } from "antd";
import { Tasks } from "./Tasks";
import Memebers from "./Members";
import Settings from "./Settings";

export const ProjectInfo = () => {
  const [project, setProject] = useState(null);
  const [isUserAdminOrOwner, setIsUserAdminOrOwner] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl uppercase">Mukesh</h1>
          <span>iflip</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>Created at: 10:00</span>
          <span>Created by: hello</span>
        </div>
      </div>

      <Tabs defaultActiveKey="1" className="mt-5">
        <Tabs.TabPane tab="Tasks" key="1">
          <Tasks  />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Members" key="2">
          <Memebers
           
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Settings" key="3">
          <Settings />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
