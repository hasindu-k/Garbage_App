import React from "react";
import { Button, Form, Input, message, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";

const rules = [{ required: true, message: "This field is required" }];

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // console.log(JSON.stringify(values));
    console.log(values);

    const { email, password } = values;

    try {
      const response = await fetch("http://localhost:8070/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Login successful!");
        if (data.isAdmin) {
          navigate("/admin-dashboard"); // Navigate to the admin dashboard
        } else {
          navigate("/dashboard"); // Navigate to the regular user dashboard
        }
      } else {
        message.error(data.error || "Login failed");
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "50px" }}>
      <h2>Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={rules}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={rules}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>

      <Divider />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
