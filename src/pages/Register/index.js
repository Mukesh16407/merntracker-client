import React, { useEffect, useState } from "react";
import { Form, Input, Button,message  } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../apicalls/users";
import { SetButtonLoading } from "../../redux/loaderSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
]

function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {buttonLoading} = useSelector(state=>state.loaders)

  const onFinish = async(values) => {
   
   try{
    dispatch(SetButtonLoading(true));
    const response = await RegisterUser(values);
    dispatch(SetButtonLoading(false));
    if (response.success) {
      message.success(response.message);
      navigate("/login");
    } else {
      throw new Error(response.message);
    }
   }catch(error){
    dispatch(SetButtonLoading(false));
    message.error(error.message);
   }
  };
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="bg-primary h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-7xl text-white">NP-TRACKER</h1>
          <span className=" text-white mt-5">
            One place to track all your business records
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[420px]">
          <h1 className="text-2xl text-gray-700 uppercase">
            Lets get you started
          </h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules}>
              <Input type="password" placeholder="Password" />
            </Form.Item>


            <Button type="primary" htmlType="submit" block
            loading={buttonLoading}>
               {buttonLoading ? "Loading" : "Register"}
            </Button>

            <div className="flex justify-center mt-5">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
