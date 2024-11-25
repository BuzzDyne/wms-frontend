import { useSelector, useDispatch } from "react-redux";
import { Layout, Dropdown, Button, theme, MenuProps, Flex } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../models/types";
import useAuth from "../../hooks/useAuth";
import { capitalizeString } from "../../utils/utils";

const { Header } = Layout;

const AppHeader = () => {
  const { auth, setAuth } = useAuth();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow);
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
          setAuth({});
          localStorage.removeItem("auth");
          navigate("/login", { replace: true });
        },
      },
    ],
  };

  const toggleSidebar = () => {
    dispatch({ type: "set", sidebarShow: !sidebarShow });
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
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Flex align="center">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleSidebar}
            style={{ marginRight: 16 }}
          />
        </Flex>
        <Flex style={{ width: "100%" }} align="center" justify="center">
          <Button type="primary" icon={<ScanOutlined />}>
            Scan QR
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <Dropdown menu={profileMenu} placement="bottomRight" arrow>
          <Button icon={<DownOutlined />} iconPosition="end">
            Welcome, {capitalizeString(auth.token_username)}
          </Button>
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default AppHeader;
