import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ roles }) {
  const { user } = useAuth();
  const userRoles = user?.role || [];

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" />;
  }

  if (roles && !roles.some((role) => userRoles.includes(role))) {
    // User does not have the required role
    return <div>You do not have access to this page.</div>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
