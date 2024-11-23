import React, { ComponentType, Suspense } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout, theme } from "antd";
import routes from "../../routesConfig";
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "16px 16px" }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
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
      </div>
    </Content>
  );
};

export default AppContent;
