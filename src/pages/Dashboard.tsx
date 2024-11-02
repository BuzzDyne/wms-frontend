import React from "react";
import { Button, message } from "antd";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
