import React, { useEffect } from "react";
import Divider from "../../components/Divider";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loaderSlice";
import { LoginUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
]

export const Login = () => {
  const dispatch = useDispatch();
 
  const {buttonLoading} = useSelector(state=> state.loaders);

  const onFinish = async (values) => {
    try{
     dispatch(SetButtonLoading(true));
     const response = await LoginUser(values);
     dispatch(SetButtonLoading(false));

     if(response.success){
      localStorage.setItem("token", response.data);
      message.success(response.message);
      window.location.href = "/";
     }else {
      throw new Error(response.message);
    }

    }catch(error){
      dispatch(SetButtonLoading(false));
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
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
          <h1 className="text-2xl text-gray-700">LOGIN TO YOUR ACCOUNT</h1>
          <Divider />
          <Form layout="vertical"onFinish={onFinish}>
            <Form.Item label="Email" name="email"rules={rules}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password"rules={rules}>
              <Input type="password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block
            loading={buttonLoading}>
             {buttonLoading ? "Loading" : "Login"}
            </Button>

            <div className="flex justify-center mt-5">
              <span>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
