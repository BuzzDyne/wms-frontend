import React from "react";
import {
  Layout,
  Dropdown,
  Avatar,
  Button,
  theme,
  Typography,
  MenuProps,
} from "antd";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const profileMenu: MenuProps = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => {
          logout();
          navigate("/login");
        },
      },
    ],
  };
  return (
    <Header
      style={{
        padding: "0 16px",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Hamburger icon */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => {
            alert("Not Implemented\n TODO");
          }}
          style={{ marginRight: 16 }}
        />
        {/* Title */}
        <Title level={3} style={{ margin: 0 }}>
          CartexBlance WMS
        </Title>
      </div>

      {/* Profile dropdown on the right */}
      <Dropdown menu={profileMenu} trigger={["click"]}>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Avatar icon={<UserOutlined />} />
          <span style={{ color: "#1890ff" }}>Profile</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
