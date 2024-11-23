import { GoogleOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { MenuItem } from "../models/types";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: string
): MenuItem {
  return {
    key,
    label,
    icon,
    children,
    ...(path && { path }),
  };
}

export const defaultNavItems: MenuItem[] = [
  getItem("Dashboard", "2", <GoogleOutlined />, undefined, "/dashboard"),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Home", "3", <HomeOutlined />, undefined, "/home"),
    getItem("Bill", "4", undefined, undefined, "/user/bill"),
    getItem("Alex", "5", undefined, undefined, "/user/alex"),
  ]),
];
