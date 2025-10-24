import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Testing from "./pages/Testing";
import Terms from "./pages/Terms";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>{<Testing />} </ProtectedRoute>
          }
        />
        <Route path="/terms & conditions" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="admin" element={<AdminPage />} />
        <Route
          path="*"
          element={<div className="bg-red-600">404 Page Not Found</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
