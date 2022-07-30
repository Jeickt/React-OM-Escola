import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ prevPath: location.pathname }} />;
  }

  return <Outlet />;
}
