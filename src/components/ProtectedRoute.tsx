import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children?: React.ReactNode; // Allow children for specific element rendering if needed
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, hasRole, currentUser } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(allowedRoles)) {
    // Redirect to an unauthorized page or home if role not allowed
    // For simplicity, redirecting to home. Consider a dedicated unauthorized page.
    console.warn(`User ${currentUser?.username} with role ${currentUser?.role} tried to access a route restricted to ${allowedRoles.join(', ')}`);
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;