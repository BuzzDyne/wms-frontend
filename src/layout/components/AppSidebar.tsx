import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Layout, Menu, MenuProps, theme } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { RootState } from "../../models/types";

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
type MenuItem = Required<MenuProps>["items"][number];
const sidebarItems: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleCloseNavbar = () => {
    dispatch({ type: "set", sidebarShow: false });
  };

  return (
    <>
      {!isMobile && (
        <Sider
          collapsed={sidebarShow}
          width={200}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div style={{ height: "100px" }} />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={sidebarItems}
          />
        </Sider>
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={handleCloseNavbar}
          open={sidebarShow}
          styles={{
            body: { padding: 0, backgroundColor: "#001529" },
            header: { backgroundColor: "#001529", color: "white" },
          }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={sidebarItems}
          />
        </Drawer>
      )}
    </>
  );
};

export default AppSidebar;
