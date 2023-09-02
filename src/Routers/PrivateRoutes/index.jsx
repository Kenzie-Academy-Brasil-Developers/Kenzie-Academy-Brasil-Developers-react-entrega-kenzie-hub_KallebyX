import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuthUser } from '../../context/UserContext';
import DashboardPage from '../../components/DashboardPage';

function PrivateRoutes() {
  const { user } = useAuthUser();

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default PrivateRoutes;
