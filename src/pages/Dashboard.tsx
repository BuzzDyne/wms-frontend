import React from "react";
import { Button, message, Typography } from "antd";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { TOAST_DURATION } from "../utils/constant";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Logged out successfully", TOAST_DURATION);
    navigate("/login");
  };

  return (
    <>
      <Title>Dashboad</Title>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
