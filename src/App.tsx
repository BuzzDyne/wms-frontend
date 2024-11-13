import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { isAuthenticated } from "./services/auth";
import HealthPage from "./pages/HealthPage";
import { ConfigProvider, Spin } from "antd";
import { AuthProvider } from "./context/AuthProvider";

const routesConfig = [
  { path: "/login", element: <LoginPage />, private: false },
  { path: "/health", element: <HealthPage />, private: false },
  { path: "/", element: <Dashboard />, private: true },
  { path: "/lol", element: <div>lol</div>, private: true },
];

// Pages
const Page404 = React.lazy(() => import("./pages/Page404"));

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorIcon: "#A9A9A9",
      },
    }}
  >
    <Router>
      <AuthProvider>
        <Suspense
          fallback={
            <Spin
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            />
          }
        >
          <Routes>
            <Route path="/404" element={<Page404 />} />
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
    </Router>
  </ConfigProvider>
);

export default App;
