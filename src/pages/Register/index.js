import React from 'react'
import Divider from '../../components/Divider';

import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";


export const Register = () => {
  return (
    <div className="grid grid-cols-2">
        <div className="h-screen  flex justify-center items-center">
        <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">LETS GET YOU STARTED</h1>
        <Divider />
        <Form layout="vertical" >
        <Form.Item label="Name" name="name" >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email" >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password" >
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2"
             
            >
              Register
            </Button>

            <div className="mt-5 text-center">
              <span className="text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </span>
            </div>

        </Form>
        </div>
        </div>

    </div>
  )
}
