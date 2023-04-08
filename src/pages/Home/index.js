import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, message, Tag } from "antd";

export const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProjects = async () => {
  }
  useEffect(()=>{
    getProjects()
  },[])
  return (
    <div>
       <h1 className="text-primary text-xl">
        Heyy , Welcome to NP-Tracker
      </h1>
      <span>Select a project to view its details</span>
      <div className="grid grid-cols-4 gap-5 mt-5">
       
          <div className="p-2 rounded-md border border-solid border-gray-300 cursor-pointer flex flex-col gap-2"
          
           
          >
            <h1 className="text-xl uppercase font-semibold">Mukesh</h1>
            <span>iflip</span>
            <span>Created at: 12:00</span>
            <div className="flex justify-end">
              <Tag >
                 project status
              </Tag>
            </div>
          </div>
        
      </div>

    </div>
  )
}
