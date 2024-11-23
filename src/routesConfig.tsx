import {
  AppstoreOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ReactNode, LazyExoticComponent } from "react";
import { lazy } from "react";

// Type definition for each route
export interface RouteConfig {
  path?: string; // Optional for group items
  label: string;
  icon?: ReactNode; // Icon component
  component?: LazyExoticComponent<React.FC>; // Lazy-loaded page component
  children?: RouteConfig[]; // Nested sub-items
}

const routes: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    icon: <HomeOutlined />,
    component: lazy(() => import("./pages/Home")),
  },
  {
    label: "Group 1",
    icon: <SettingOutlined />,
    children: [
      {
        path: "/group1/subpage1",
        label: "Sub Page 1",
        component: lazy(() => import("./pages/Group1/SubPage1")),
      },
    ],
  },
  {
    path: "/about",
    label: "About",
    icon: <InfoCircleOutlined />,
    component: lazy(() => import("./pages/About")),
  },
  {
    path: "/services",
    label: "Services",
    icon: <AppstoreOutlined />,
    component: lazy(() => import("./pages/Services")),
  },
];

export default routes;
