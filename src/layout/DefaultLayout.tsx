import React from "react";
import { Layout } from "antd";
import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";

const DefaultLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <div>App Content</div>
        <div>App Footer</div>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
