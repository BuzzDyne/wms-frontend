import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { TOAST_DURATION } from "../utils/constant";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    // Mock authentication
    if (values.username === "user" && values.password === "user") {
      login("mock-token");
      message.success("Login successful!", TOAST_DURATION);
      navigate("/");
    } else {
      message.error("Invalid username or password", TOAST_DURATION);
    }
    setLoading(false);
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        style={{ maxWidth: 300, margin: "0 auto", marginTop: "100px" }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block type="link" onClick={() => navigate("/health")}>
            Go to Health Check Page
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginPage;
