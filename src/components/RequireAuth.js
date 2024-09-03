import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children, requiredRole }) => {
  const { auth } = useAuth();

  if (!auth?.token) {
    // Redirect to sign-in if no token
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    // Redirect to sign-in if the role does not match
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default RequireAuth;
