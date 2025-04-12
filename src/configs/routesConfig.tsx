import React, { LazyExoticComponent } from "react";

const Dashboard = React.lazy(() => import("../components/subpage/Dashboard"));
const Home = React.lazy(() => import("../components/subpage/Home"));
const InboundSchedule = React.lazy(
  () => import("../components/subpage/InboundSchedule")
);
const AccountManagement = React.lazy(
  () => import("../components/subpage/AccountManagement")
);
const NewPicklist = React.lazy(
  () => import("../components/subpage/NewPicklist")
);
const ListPicklist = React.lazy(
  () => import("../components/subpage/ListPicklist")
);
const InboundHistory = React.lazy(
  () => import("../components/subpage/InboundHistory")
);
const InventorySettingsTSC = React.lazy(
  () => import("../components/subpage/InventorySettingsTSC")
);
const InventorySettingsMap = React.lazy(
  () => import("../components/subpage/InventorySettingsMapping")
);
const Inventory = React.lazy(() => import("../components/subpage/Inventory"));

interface RouteConfig {
  path: string;
  element: LazyExoticComponent<React.FC>;
}

const routes: RouteConfig[] = [
  { path: "/dashboard", element: Dashboard },
  { path: "/home", element: Home },
  { path: "/inbound-schedule", element: InboundSchedule },
  { path: "/account-management", element: AccountManagement },
  { path: "/list-picklist", element: ListPicklist },
  { path: "/new-picklist", element: NewPicklist },
  { path: "/inbound-history", element: InboundHistory },
  { path: "/inventory", element: Inventory },
  { path: "/inventory-settings-tsc", element: InventorySettingsTSC },
  { path: "/inventory-settings-mapping", element: InventorySettingsMap },
];

export default routes;
