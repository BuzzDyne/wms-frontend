import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { isAuthenticated } from "./services/auth";
import HealthPage from "./pages/HealthPage";
import { ConfigProvider, Spin } from "antd";
import { AuthProvider } from "./context/AuthProvider";

const routesConfig = [
  { path: "/login", element: <PageLogin />, private: false },
  { path: "/health", element: <HealthPage />, private: false },
  { path: "/", element: <Dashboard />, private: true },
  { path: "/lol", element: <div>lol</div>, private: true },
];

const loadingSpinner = (
  <Spin
    size="large"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  />
);

// Layout
const DefaultLayout = React.lazy(() => import("./layout/DashboardLayout"));

// Pages
const PageNotFound = React.lazy(() => import("./pages/Page404"));
const LoginPage = React.lazy(() => import("./pages/PageLogin"));
const PageHealth = React.lazy(() => import("./pages/HealthPage"));

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorIcon: "#A9A9A9",
      },
    }}
  >
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={loadingSpinner}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/404" element={<PageNotFound />} />
            {/* <Route path="*" element={<DefaultLayout />} /> */}

            {routesConfig.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.private ? (
                    <PrivateRoute>{route.element}</PrivateRoute>
                  ) : (
                    route.element
                  )
                }
              />
            ))}
            <Route
              path="*"
              element={
                isAuthenticated() ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
