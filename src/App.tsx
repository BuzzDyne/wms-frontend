import React from "react";
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

const routesConfig = [
  { path: "/login", element: <LoginPage />, private: false },
  { path: "/health", element: <HealthPage />, private: false },
  { path: "/", element: <Dashboard />, private: true },
  { path: "/lol", element: <div>lol</div>, private: true },
];

const App: React.FC = () => (
  <Router>
    <Routes>
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
          isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  </Router>
);

export default App;
