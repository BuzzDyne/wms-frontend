// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import DashboardLayout from "../layout/DashboardLayout";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
