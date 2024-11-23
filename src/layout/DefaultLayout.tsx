import React from "react";
import { Layout } from "antd";
import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";

const DefaultLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
