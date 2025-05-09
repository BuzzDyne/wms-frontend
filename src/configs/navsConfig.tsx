import {
  GoogleOutlined,
  RollbackOutlined,
  SettingFilled,
  ShopOutlined,
  TruckFilled,
  UploadOutlined,
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

export const temporaryUserNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("Picklist Creation", "out1", undefined, undefined, "/new-picklist"),
  ]),
];

export const ownerNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
  getItem("Inventory", "a2", <ShopOutlined />, undefined, "/inventory"),

  getItem("Inbound", "inb", <TruckFilled />, [
    getItem(
      "Inbound Schedule",
      "inb1",
      undefined,
      undefined,
      "/inbound-schedule"
    ),
    getItem("Inbound List", "inb3", undefined, undefined, "/inbound-list"),
  ]),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("Picklist Creation", "out1", undefined, undefined, "/new-picklist"),
    getItem("List Picklist", "out2", undefined, undefined, "/list-picklist"),
  ]),

  getItem("Returns", "ret", <RollbackOutlined />, [
    getItem("Returns Creation", "ret1", undefined, undefined, "/"),
    getItem("List Returns", "ret2", undefined, undefined, "/home"),
  ]),

  getItem("Admin Panel", "adm", <SettingFilled />, [
    getItem(
      "Account Management",
      "adm2",
      undefined,
      undefined,
      "/account-management"
    ),
    getItem("Inventory Settings", "adm3", undefined, [
      getItem(
        "Inventory Type/Size/Color",
        "adm3-1",
        undefined,
        undefined,
        "/inventory-settings-tsc"
      ),
      getItem(
        "Inventory Mapping",
        "adm3-2",
        undefined,
        undefined,
        "/inventory-settings-mapping"
      ),
    ]),
    getItem("Audit Log", "adm4", undefined, undefined, "/"),
    getItem("Report", "adm5", undefined, undefined, "/"),
  ]),
];

export const ecomNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("Picklist Creation", "out1", undefined, undefined, "/"),
    getItem("List Picklist", "out2", undefined, undefined, "/list-picklist"),
  ]),
];

export const wareNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
  getItem("Inventory", "a2", <ShopOutlined />, undefined, "/"),

  getItem("Outbound", "out", <UploadOutlined />, [
    getItem("List Picklist", "out2", undefined, undefined, "/list-picklist"),
  ]),

  getItem("Returns", "ret", <RollbackOutlined />, [
    getItem("Returns Creation", "ret1", undefined, undefined, "/"),
    getItem("List Returns", "ret2", undefined, undefined, "/home"),
  ]),
];

export const packNavItems: MenuItem[] = [
  getItem("Dashboard", "a1", <GoogleOutlined />, undefined, "/dashboard"),
];
