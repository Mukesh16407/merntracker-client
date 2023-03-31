import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    </div>
  )
}
