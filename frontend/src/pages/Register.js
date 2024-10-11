import React from "react";
import { Button, Form, Input, message, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";

const rules = [{ required: true, message: "This field is required" }];

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    console.log(JSON.stringify(values));

    try {
      const response = await fetch("http://localhost:8070/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        message.success("Registration successful!");
        navigate("/login");
      } else {
        message.error(data.error || "Registration failed"); // Access the error from the response
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "50px" }}>
      <h2>Register</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={rules}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={rules}>
          <Input placeholder="Enter your address" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={rules}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="contact" label="Contact" rules={rules}>
          <Input placeholder="Enter your contact number" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={rules}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={rules}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>

      <Divider />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
