import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ActivateAccount from "./pages/activateAccount/ActivateAccount";
import SetPassword from "./pages/activateAccount/SetPassword";
import Layout from "./components/Layout";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Header from "./components/Header";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/signin" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/activate-account" element={<ActivateAccount />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/admin/profile"
              element={
                <RequireAuth requiredRole="ADMIN">
                  <AdminDashboard showProfile={true} />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/:tableName"
              element={
                <RequireAuth requiredRole="ADMIN">
                  <AdminDashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/manager/profile"
              element={
                <RequireAuth requiredRole="MANAGER">
                  <ManagerDashboard showProfile={true} />
                </RequireAuth>
              }
            />
            <Route
              path="/manager/:tableName"
              element={
                <RequireAuth requiredRole="MANAGER">
                  <ManagerDashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/employee/profile"
              element={
                <RequireAuth requiredRole="EMPLOYEE">
                  <UserDashboard showProfile={true} />
                </RequireAuth>
              }
            />
            <Route path="/dashboard" element={<RoleBasedDashboard />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Route>
        </Routes>
      </StyledEngineProvider>
    </>
  );
}

const RoleBasedDashboard = () => {
  const { auth } = useAuth();

  if (auth?.role === "ADMIN") {
    return <Navigate to="/admin/profile" replace />;
  } else if (auth?.role === "MANAGER") {
    return <Navigate to="/manager/profile" replace />;
  } else if (auth?.role === "EMPLOYEE") {
    return <Navigate to="/employee/profile" replace />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default App;
