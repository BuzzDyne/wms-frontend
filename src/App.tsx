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

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/health" element={<HealthPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

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
