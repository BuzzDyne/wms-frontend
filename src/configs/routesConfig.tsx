import React, { LazyExoticComponent } from "react";

const Dashboard = React.lazy(() => import("../components/Dashboard"));
const Home = React.lazy(() => import("../components/Home"));
const InboundSchedule = React.lazy(
  () => import("../components/InboundSchedule")
);

interface RouteConfig {
  path: string;
  element: LazyExoticComponent<React.FC>;
}

const routes: RouteConfig[] = [
  { path: "/dashboard", element: Dashboard },
  { path: "/home", element: Home },
  { path: "/inbound-schedule", element: InboundSchedule },
];

export default routes;
