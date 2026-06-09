import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, user, loading }) => {
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="relative h-10 w-10">
          <div className="absolute h-full w-full rounded-full border-4 border-slate-200"></div>
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-t-slate-800"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;