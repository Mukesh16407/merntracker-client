import React, { useEffect } from "react";
import { Tabs } from "antd";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Projects from "./Projects";
import { Users } from "./users";


export const Admin=()=> {
  const navigate = useNavigate();
 
  

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Projects" key="1">
          <Projects />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;