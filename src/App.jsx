import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/u/a/admin/login" element={<AdminLogin />} />
      <Route
        path="/u/a/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
