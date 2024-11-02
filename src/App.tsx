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

const App: React.FC = () => (
  <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Catch-All Route for Unstated Paths */}
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
