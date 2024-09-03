import React from "react";
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
      <Header />
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate replace to="/signin" />} />
            <Route path="/signin" element={<Login />}></Route>

            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/activate-account"
              element={<ActivateAccount />}
            ></Route>
            <Route path="/set-password" element={<SetPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route
              path="/dashboard/admin"
              element={
                <RequireAuth requiredRole="ADMIN">
                  <AdminDashboard />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/dashboard/manager"
              element={
                <RequireAuth requiredRole="MANAGER">
                  <ManagerDashboard />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/dashboard/employee"
              element={
                <RequireAuth requiredRole="EMPLOYEE">
                  <UserDashboard />
                </RequireAuth>
              }
            ></Route>
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
    return <Navigate to="/dashboard/admin" replace />;
  } else if (auth?.role === "MANAGER") {
    return <Navigate to="/dashboard/manager" replace />;
  } else if (auth?.role === "EMPLOYEE") {
    return <Navigate to="/dashboard/employee" replace />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default App;
