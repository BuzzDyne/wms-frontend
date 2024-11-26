import React, { ComponentType, Suspense } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import routes from "../../configs/routesConfig";
const { Content } = Layout;

interface ProtectedRouteProps {
  element: ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
}) => {
  const { auth } = useAuth();

  const isAuthenticated = () => !!auth?.token_username;
  //   const isAuthenticated = () => true;
  if (!isAuthenticated()) {
    console.log(`Caught User is not authed, auth is: `, auth);
    return <Navigate to="/login" />;
  }

  return <Element />;
};

const AppContent = () => {
  return (
    <Content style={{ margin: "16px 32px" }}>
      <Suspense>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={<ProtectedRoute element={route.element} />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Content>
  );
};

export default AppContent;
