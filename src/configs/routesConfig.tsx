import React, { LazyExoticComponent } from "react";

const Dashboard = React.lazy(() => import("../components/Dashboard"));
const Home = React.lazy(() => import("../components/Home"));

interface RouteConfig {
  path: string;
  element: LazyExoticComponent<React.FC>;
}

const routes: RouteConfig[] = [
  { path: "/dashboard", element: Dashboard },
  { path: "/home", element: Home },
];

export default routes;
