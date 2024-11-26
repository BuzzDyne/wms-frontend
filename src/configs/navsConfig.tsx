import {
  DashboardFilled,
  DashboardOutlined,
  GoogleOutlined,
  HomeOutlined,
  ImportOutlined,
  RollbackOutlined,
  ShopOutlined,
  TruckFilled,
  TruckOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
];

export const ownerNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
  getItem("Inventory", "a2", <ShopOutlined />, undefined, "/"),

  getItem("Inbound", "inb", <TruckFilled />, [
    getItem(
      "Inbound Schedule",
      "inb1",
      undefined,
      undefined,
      "/inbound-schedule"
    ),
    getItem("Inbound Creation", "inb2", undefined, undefined, "/"),
    getItem("Inbound History", "inb3", undefined, undefined, "/"),
  ]),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("Picklist Creation", "out1", undefined, undefined, "/"),
    getItem("List Picklist", "out2", undefined, undefined, "/home"),
  ]),

  getItem("Returns", "ret", <RollbackOutlined />, [
    getItem("Returns Creation", "ret1", undefined, undefined, "/"),
    getItem("List Returns", "ret2", undefined, undefined, "/home"),
  ]),

  getItem("Admin Panel", "adm", <DashboardOutlined />, [
    getItem("Account Management", "adm2", undefined, undefined, "/home"),
    getItem("Audit Log", "adm3", undefined, undefined, "/"),
    getItem("Report", "adm4", undefined, undefined, "/"),
  ]),
];

export const ecomNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("Picklist Creation", "out1", undefined, undefined, "/"),
    getItem("List Picklist", "out2", undefined, undefined, "/home"),
  ]),
];

export const wareNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
  getItem("Inventory", "a2", <ShopOutlined />, undefined, "/"),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("List Picklist", "out2", undefined, undefined, "/home"),
  ]),

  getItem("Returns", "ret", <RollbackOutlined />, [
    getItem("Returns Creation", "ret1", undefined, undefined, "/"),
    getItem("List Returns", "ret2", undefined, undefined, "/home"),
  ]),
];

export const packNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
];
