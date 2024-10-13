import React from "react";
import { Button, Form, Input, message, Divider } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";

const rules = [{ required: true, message: "This field is required" }];

function Register() {
  const location = useLocation();
  const { selectedRole } = location.state || { selectedRole: "" };
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    const registerValues = {
      ...values,
      role: selectedRole.toLowerCase(),
    };

    try {
      const response = await fetch("http://localhost:8070/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerValues),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Registration successful!");
        navigate("/login");
      } else {
        message.error(data.error || "Registration failed");
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={rules}>
          <Input placeholder="Enter your name" className="border border-gray-300 rounded-md" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={rules}>
          <Input placeholder="Enter your address" className="border border-gray-300 rounded-md" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={rules}>
          <Input placeholder="Enter your email" className="border border-gray-300 rounded-md" />
        </Form.Item>
        <Form.Item name="contact" label="Contact" rules={rules}>
          <Input placeholder="Enter your contact number" className="border border-gray-300 rounded-md" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={rules}>
          <Input.Password placeholder="Enter your password" className="border border-gray-300 rounded-md" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={rules}
        >
          <Input.Password placeholder="Confirm your password" className="border border-gray-300 rounded-md" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block className="bg-blue-500 hover:bg-blue-600 text-white">
          Register
        </Button>
      </Form>

      <Divider />
      <p className="text-center">
        Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
