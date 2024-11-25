import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Title>Dashboard</Title>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
